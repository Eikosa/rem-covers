import { usePlugin, renderWidget, useTracker, WidgetLocation } from '@remnote/plugin-sdk';
import React, { useEffect, useState, useRef } from 'react';
import { BackgroundPicker } from '../components/BackgroundPicker';
import { DefaultBackgroundState, getDocumentBackground, setDocumentBackground } from '../utils/storage';
import { Image as ImageIcon, MoveVertical } from 'lucide-react';
import { JAMES_WEBB } from '../components/BackgroundPicker';
import '../style.css';
import '../index.css';

export const DocumentBackground = () => {
    const plugin = usePlugin();
    const [documentId, setDocumentId] = useState<string | null>(null);

    // Polling mechanism is strictly required here: 
    // RemNote recycles the DocumentAboveToolbar widget without triggering standard pane/focus React events 
    // when drilling down into child Rems or zooming.
    useEffect(() => {
        let isMounted = true;

        const fetchContext = async () => {
            if (!isMounted) return;
            const context = await plugin.widget.getWidgetContext<WidgetLocation.DocumentAboveToolbar>();
            if (context?.documentId && context.documentId !== documentId) {
                setDocumentId(context.documentId);
            }
        };

        fetchContext();
        const intervalId = setInterval(fetchContext, 500);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [plugin, documentId]);

    const backgroundDataState = useTracker(async (reactivePlugin) => {
        if (!documentId) return { loaded: false, data: null };
        const data = await getDocumentBackground(reactivePlugin, documentId);
        return { loaded: true, data };
    }, [documentId]);

    const showAddCoverButton = useTracker(async (reactivePlugin) => {
        return await reactivePlugin.settings.getSetting('show-add-cover-button') !== false; // Default true
    }, []);

    const [showPicker, setShowPicker] = useState(false);
    const [isRepositioning, setIsRepositioning] = useState(false);
    const [yPosition, setYPosition] = useState(50);
    const [startY, setStartY] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (backgroundDataState?.data) {
            setYPosition(backgroundDataState.data.yPosition ?? 50);
        }
    }, [backgroundDataState]);

    const handleSelectBackground = async (data: DefaultBackgroundState | null) => {
        if (!documentId) return;
        await setDocumentBackground(plugin, documentId, data);
        setShowPicker(false);
    };

    const handleAddCover = async () => {
        if (!documentId) return;
        const defaultBg = {
            type: 'image' as const,
            value: JAMES_WEBB[Math.floor(Math.random() * JAMES_WEBB.length)],
            yPosition: 50
        };
        await setDocumentBackground(plugin, documentId, defaultBg);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isRepositioning) return;
        if ((e.target as HTMLElement).closest('button')) return; // Allow button clicks
        e.preventDefault(); // Prevent native dragging behavior
        e.currentTarget.setPointerCapture(e.pointerId);
        setStartY(e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isRepositioning || !e.currentTarget.hasPointerCapture(e.pointerId)) return;

        const diff = e.clientY - startY;
        const height = e.currentTarget.clientHeight;
        const percentDiff = (diff / height) * 100;

        setYPosition(prev => Math.min(Math.max(prev - percentDiff * 0.5, 0), 100));
        setStartY(e.clientY);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isRepositioning) return;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    if (!documentId || !backgroundDataState?.loaded) {
        return null;
    }

    const backgroundData = backgroundDataState.data;
    const hasBackground = !!backgroundData;

    if (!hasBackground && !showAddCoverButton) {
        return null; // Render absolutely nothing to take 0px space
    }

    return (
        <div className="rn-widget-root" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
                className={`rn-background-container ${hasBackground ? 'has-background' : 'no-background'} ${isRepositioning ? 'repositioning' : ''}`}
                ref={containerRef}
                onPointerDown={hasBackground ? handlePointerDown : undefined}
                onPointerMove={hasBackground ? handlePointerMove : undefined}
                onPointerUp={hasBackground ? handlePointerUp : undefined}
            >
                {hasBackground && (
                    backgroundData.type === 'image' ? (
                        <img
                            className="rn-background-layer"
                            src={backgroundData.value}
                            style={{
                                objectFit: 'cover',
                                objectPosition: `center ${yPosition}%`
                            }}
                            draggable="false"
                            alt="Background Cover"
                        />
                    ) : (
                        <div
                            className="rn-background-layer"
                            style={{ background: backgroundData.value }}
                        />
                    )
                )}

                {/* Hover actions */}
                {hasBackground ? (
                    <div className="rn-background-actions">
                        {isRepositioning ? (
                            <div className="rn-background-reposition-bar">
                                <span>Drag image to reposition</span>
                                <button
                                    className="rn-btn primary"
                                    onClick={async () => {
                                        setIsRepositioning(false);
                                        if (backgroundData) {
                                            await setDocumentBackground(plugin, documentId, { ...backgroundData, yPosition });
                                        }
                                    }}
                                >
                                    Save Position
                                </button>
                            </div>
                        ) : (
                            <div className="rn-background-button-group">
                                <button className="rn-btn hover-btn" onClick={() => setShowPicker(!showPicker)}>
                                    <ImageIcon size={16} />
                                    Change Cover
                                </button>
                                {backgroundData.type === 'image' && (
                                    <button className="rn-btn hover-btn" onClick={() => setIsRepositioning(true)}>
                                        <MoveVertical size={16} />
                                        Reposition
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="rn-background-add-wrapper">
                        <div className="rn-background-add-inner">
                            <button className="rn-btn hover-btn add-cover-btn no-bg" onClick={handleAddCover}>
                                <ImageIcon size={16} />
                                Add Cover
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showPicker && (
                <BackgroundPicker
                    onSelect={handleSelectBackground}
                    onClose={() => setShowPicker(false)}
                />
            )}
        </div>
    );
};

renderWidget(DocumentBackground);
