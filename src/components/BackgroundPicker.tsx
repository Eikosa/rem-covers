import React, { useState, useEffect, useRef } from 'react';
import { DefaultBackgroundState, SizeMode } from '../utils/storage';
import {
    Upload, Link as LinkIcon, Image as ImageIcon,
    Sliders, RotateCcw, Info,
    Maximize, Minimize, Move, ArrowDownToLine, Repeat,
    Layout, Palette, Sun, Contrast, Droplets, Sparkles, Moon,
    MoveHorizontal, MoveVertical, Expand, Scissors, Eye
} from 'lucide-react';

interface BackgroundPickerProps {
    onSelect: (state: DefaultBackgroundState | null) => void;
    onClose: () => void;
    currentData: DefaultBackgroundState | null;
    globalHeight: number;
    onUpdateSettings: (updates: Partial<DefaultBackgroundState>) => void;
    onResetSettings: () => void;
}

const NOTION_BG_BASE = "https://www.notion.so/images/page-cover/";

const NOTION_COLORS_GRADIENTS = [
    { type: 'image', value: NOTION_BG_BASE + 'solid_red.png', label: 'Red' },
    { type: 'image', value: NOTION_BG_BASE + 'solid_yellow.png', label: 'Yellow' },
    { type: 'image', value: NOTION_BG_BASE + 'solid_blue.png', label: 'Blue' },
    { type: 'image', value: NOTION_BG_BASE + 'solid_beige.png', label: 'Beige' },
    { type: 'image', value: NOTION_BG_BASE + 'gradients_8.png', label: 'Gradient 8' },
    { type: 'image', value: NOTION_BG_BASE + 'gradients_4.png', label: 'Gradient 4' },
    { type: 'image', value: NOTION_BG_BASE + 'gradients_2.png', label: 'Gradient 2' },
    { type: 'image', value: NOTION_BG_BASE + 'gradients_11.jpg', label: 'Gradient 11' },
    { type: 'image', value: NOTION_BG_BASE + 'gradients_10.jpg', label: 'Gradient 10' },
    { type: 'image', value: NOTION_BG_BASE + 'gradients_5.png', label: 'Gradient 5' },
    { type: 'image', value: NOTION_BG_BASE + 'gradients_3.png', label: 'Gradient 3' }
];

export const JAMES_WEBB = [
    NOTION_BG_BASE + 'webb1.jpg',
    NOTION_BG_BASE + 'webb2.jpg',
    NOTION_BG_BASE + 'webb3.jpg',
    NOTION_BG_BASE + 'webb4.jpg'
];

const NASA_ARCHIVE = [
    NOTION_BG_BASE + 'nasa_the_blue_marble.jpg',
    NOTION_BG_BASE + 'nasa_transonic_tunnel.jpg',
    NOTION_BG_BASE + 'nasa_multi-axis_gimbal_rig.jpg',
    NOTION_BG_BASE + 'nasa_eva_during_skylab_3.jpg',
    NOTION_BG_BASE + 'nasa_eagle_in_lunar_orbit.jpg',
    NOTION_BG_BASE + 'nasa_buzz_aldrin_on_the_moon.jpg',
    NOTION_BG_BASE + 'nasa_ibm_type_704.jpg',
    NOTION_BG_BASE + 'nasa_wrights_first_flight.jpg',
    NOTION_BG_BASE + 'nasa_great_sandy_desert_australia.jpg',
    NOTION_BG_BASE + 'nasa_space_shuttle_columbia.jpg',
    NOTION_BG_BASE + 'nasa_robert_stewart_spacewalk.jpg',
    NOTION_BG_BASE + 'nasa_space_shuttle_challenger.jpg',
    NOTION_BG_BASE + 'nasa_robert_stewart_spacewalk_2.jpg',
    NOTION_BG_BASE + 'nasa_space_shuttle_columbia_and_sunrise.jpg',
    NOTION_BG_BASE + 'nasa_tim_peake_spacewalk.jpg',
    NOTION_BG_BASE + 'nasa_bruce_mccandless_spacewalk.jpg',
    NOTION_BG_BASE + 'nasa_new_york_city_grid.jpg',
    NOTION_BG_BASE + 'nasa_fingerprints_of_water_on_the_sand.jpg',
    NOTION_BG_BASE + 'nasa_carina_nebula.jpg',
    NOTION_BG_BASE + 'nasa_orion_nebula.jpg',
    NOTION_BG_BASE + 'nasa_reduced_gravity_walking_simulator.jpg',
    NOTION_BG_BASE + 'nasa_earth_grid.jpg'
];

const MET_MUSEUM_PATTERNS = [
    NOTION_BG_BASE + 'met_william_morris_1877_willow.jpg',
    NOTION_BG_BASE + 'met_william_morris_1875.jpg',
    NOTION_BG_BASE + 'met_william_morris_1878.jpg',
    NOTION_BG_BASE + 'met_silk_kashan_carpet.jpg'
];

const RIJKSMUSEUM = [
    NOTION_BG_BASE + 'rijksmuseum_vermeer_the_milkmaid.jpg',
    NOTION_BG_BASE + 'rijksmuseum_jansz_1649.jpg',
    NOTION_BG_BASE + 'rijksmuseum_rembrandt_1642.jpg',
    NOTION_BG_BASE + 'rijksmuseum_jansz_1636.jpg',
    NOTION_BG_BASE + 'rijksmuseum_jansz_1641.jpg',
    NOTION_BG_BASE + 'rijksmuseum_jan_lievens_1627.jpg',
    NOTION_BG_BASE + 'rijksmuseum_jansz_1637.jpg',
    NOTION_BG_BASE + 'rijksmuseum_mignons_1660.jpg',
    NOTION_BG_BASE + 'rijksmuseum_avercamp_1620.jpg',
    NOTION_BG_BASE + 'rijksmuseum_avercamp_1608.jpg',
    NOTION_BG_BASE + 'rijksmuseum_claesz_1628.jpg'
];

const MET_MUSEUM_JAPANESE = [
    NOTION_BG_BASE + 'woodcuts_1.jpg',
    NOTION_BG_BASE + 'woodcuts_2.jpg',
    NOTION_BG_BASE + 'woodcuts_3.jpg',
    NOTION_BG_BASE + 'woodcuts_4.jpg',
    NOTION_BG_BASE + 'woodcuts_5.jpg',
    NOTION_BG_BASE + 'woodcuts_6.jpg',
    NOTION_BG_BASE + 'woodcuts_7.jpg',
    NOTION_BG_BASE + 'woodcuts_8.jpg',
    NOTION_BG_BASE + 'woodcuts_9.jpg',
    NOTION_BG_BASE + 'woodcuts_10.jpg',
    NOTION_BG_BASE + 'woodcuts_11.jpg',
    NOTION_BG_BASE + 'woodcuts_13.jpg',
    NOTION_BG_BASE + 'woodcuts_14.jpg',
    NOTION_BG_BASE + 'woodcuts_15.jpg',
    NOTION_BG_BASE + 'woodcuts_16.jpg',
    NOTION_BG_BASE + 'woodcuts_sekka_1.jpg',
    NOTION_BG_BASE + 'woodcuts_sekka_2.jpg',
    NOTION_BG_BASE + 'woodcuts_sekka_3.jpg'
];

const MET_MUSEUM = [
    NOTION_BG_BASE + 'met_vincent_van_gogh_ginoux.jpg',
    NOTION_BG_BASE + 'met_winslow_homer_maine_coast.jpg',
    NOTION_BG_BASE + 'met_frederic_edwin_church_1871.jpg',
    NOTION_BG_BASE + 'met_joseph_hidley_1870.jpg',
    NOTION_BG_BASE + 'met_jules_tavernier_1878.jpg',
    NOTION_BG_BASE + 'met_henry_lerolle_1885.jpg',
    NOTION_BG_BASE + 'met_georges_seurat_1884.jpg',
    NOTION_BG_BASE + 'met_john_singer_sargent_morocco.jpg',
    NOTION_BG_BASE + 'met_paul_signac.jpg',
    NOTION_BG_BASE + 'met_vincent_van_gogh_oleanders.jpg',
    NOTION_BG_BASE + 'met_emanuel_leutze.jpg',
    NOTION_BG_BASE + 'met_fitz_henry_lane.jpg',
    NOTION_BG_BASE + 'met_vincent_van_gogh_cradle.jpg',
    NOTION_BG_BASE + 'met_camille_pissarro_1896.jpg',
    NOTION_BG_BASE + 'met_gerome_1890.jpg',
    NOTION_BG_BASE + 'met_arnold_bocklin_1880.jpg',
    NOTION_BG_BASE + 'met_henri_tl_1892.jpg',
    NOTION_BG_BASE + 'met_horace_pippin.jpg',
    NOTION_BG_BASE + 'met_jean_beraud.jpg',
    NOTION_BG_BASE + 'met_cezanne_1890.jpg',
    NOTION_BG_BASE + 'met_edgar_degas_1874.jpg',
    NOTION_BG_BASE + 'met_henri_rousseau_1907.jpg',
    NOTION_BG_BASE + 'met_vincent_van_gogh_irises.jpg',
    NOTION_BG_BASE + 'met_terracotta_funerary_plaque.jpg',
    NOTION_BG_BASE + 'met_william_turner_1835.jpg',
    NOTION_BG_BASE + 'met_the_unicorn_in_captivity.jpg',
    NOTION_BG_BASE + 'met_goya_1789.jpg',
    NOTION_BG_BASE + 'met_bruegel_1565.jpg',
    NOTION_BG_BASE + 'met_canaletto_1720.jpg',
    NOTION_BG_BASE + 'met_klimt_1912.jpg'
];

// Size modes with icons and labels
const SIZE_MODES: { value: SizeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'cover', label: 'Cover', icon: <Maximize size={12} /> },
    { value: 'contain', label: 'Contain', icon: <Minimize size={12} /> },
    { value: 'fill', label: 'Fill', icon: <Move size={12} /> },
    { value: 'auto', label: 'Auto', icon: <ImageIcon size={12} /> },
    { value: 'scale-down', label: 'Scale ↓', icon: <ArrowDownToLine size={12} /> },
];

// Debounced slider component: shows live preview, only saves on mouseUp
interface DebouncedSliderProps {
    label: string;
    icon?: React.ReactNode;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    tooltip?: string;
    defaultValue?: number;
    onCommit: (val: number | undefined) => void;
    formatValue?: (val: number) => string;
}

const DebouncedSlider: React.FC<DebouncedSliderProps> = ({
    label, icon, value, min, max, step, unit = '', tooltip, defaultValue, onCommit, formatValue
}) => {
    const [localValue, setLocalValue] = useState(value);

    // Sync local state if external value changes (e.g. from global reset)
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const isDirty = defaultValue !== undefined && Math.abs(localValue - defaultValue) > 0.001;

    const handleCommit = () => {
        if (defaultValue !== undefined && Math.abs(localValue - defaultValue) < 0.001) {
            onCommit(undefined);
        } else {
            onCommit(localValue);
        }
    };

    return (
        <div className="rn-settings-section" title={tooltip}>
            <div className="rn-settings-label-wrapper">
                <div className="rn-settings-label">
                    {icon && <span style={{ opacity: 0.8 }}>{icon}</span>}
                    {label}
                </div>
                <div className="rn-settings-actions">
                    <div className="rn-settings-value">
                        {formatValue ? formatValue(localValue) : `${localValue}${unit}`}
                    </div>
                    {isDirty && (
                        <button
                            className="rn-btn-reset-small"
                            onClick={() => onCommit(undefined)}
                            title="Reset to default"
                        >
                            <RotateCcw size={10} />
                        </button>
                    )}
                </div>
            </div>
            <input
                type="range"
                className="rn-range"
                min={min}
                max={max}
                step={step}
                value={localValue}
                onChange={(e) => setLocalValue(parseFloat(e.target.value))}
                onMouseUp={handleCommit}
                onTouchEnd={handleCommit}
                style={{ '--rn-range-pct': `${((localValue - min) / (max - min)) * 100}%` } as any}
            />
        </div>
    );
};

export const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
    onSelect,
    onClose,
    currentData,
    globalHeight,
    onUpdateSettings,
    onResetSettings
}) => {
    const [tab, setTab] = useState<'gallery' | 'upload' | 'link' | 'settings'>('gallery');
    const [linkUrl, setLinkUrl] = useState('');
    const [debugFeedback, setDebugFeedback] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handlePaste = (event: ClipboardEvent) => {
            const items = event.clipboardData?.items;
            if (!items) return;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const blob = items[i].getAsFile();
                    if (blob) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            if (e.target?.result) {
                                handleSelect('image', e.target.result as string);
                            }
                        };
                        reader.readAsDataURL(blob);
                        event.preventDefault();
                        break;
                    }
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('paste', handlePaste);
        };
    }, [onClose]);

    const handleSelect = (type: 'color' | 'gradient' | 'image', value: string) => {
        onSelect({ type, value, yPosition: 50 });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    handleSelect('image', event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLinkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (linkUrl) {
            handleSelect('image', linkUrl);
        }
    };

    const handleLogDebug = () => {
        console.group('[RemCover] Debug Information');
        console.log('Document ID:', currentData ? 'Loaded' : 'None');
        console.log('Current State:', currentData);
        console.log('Global Height:', globalHeight);
        console.groupEnd();

        setDebugFeedback(true);
        setTimeout(() => setDebugFeedback(false), 2000);
    };

    return (
        <div className="rn-background-picker-container" ref={containerRef} onClick={(e) => e.stopPropagation()}>
            <div className="rn-background-picker-header">
                <div className="rn-background-picker-tabs">
                    <button className={`rn-picker-tab ${tab === 'gallery' ? 'active' : ''}`} onClick={() => setTab('gallery')} title="Handpicked cover collection">
                        <ImageIcon size={14} />
                        Gallery
                    </button>
                    <button className={`rn-picker-tab ${tab === 'upload' ? 'active' : ''}`} onClick={() => setTab('upload')} title="Upload image from your computer">
                        <Upload size={14} />
                        Upload
                    </button>
                    <button className={`rn-picker-tab ${tab === 'link' ? 'active' : ''}`} onClick={() => setTab('link')} title="Paste a direct image link">
                        <LinkIcon size={14} />
                        Link
                    </button>
                    {currentData && (
                        <button className={`rn-picker-tab ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')} title="Customize cover appearance">
                            <Sliders size={14} />
                            Settings
                        </button>
                    )}
                </div>
                <button className="rn-background-picker-remove" onClick={() => onSelect(null)} title="Remove cover from document">
                    Remove
                </button>
            </div>

            <div className="rn-background-picker-content">
                {tab === 'gallery' && (
                    <div className="rn-background-picker-scrollable">
                        <div className="rn-background-picker-section">
                            <div className="rn-background-picker-section-title">Color & Gradient</div>
                            <div className="rn-background-picker-grid colors">
                                {NOTION_COLORS_GRADIENTS.map((item, i) => (
                                    <div
                                        key={i}
                                        className="rn-background-picker-item"
                                        style={{ backgroundImage: `url(${item.value})` }}
                                        onClick={() => handleSelect(item.type as any, item.value)}
                                        title={item.label}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rn-background-picker-section">
                            <div className="rn-background-picker-section-title">James Webb Telescope</div>
                            <div className="rn-background-picker-grid images">
                                {JAMES_WEBB.map((url, i) => (
                                    <div
                                        key={i}
                                        className="rn-background-picker-item"
                                        style={{ backgroundImage: `url(${url})` }}
                                        onClick={() => handleSelect('image', url)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rn-background-picker-section">
                            <div className="rn-background-picker-section-title">NASA Archive</div>
                            <div className="rn-background-picker-grid images">
                                {NASA_ARCHIVE.map((url, i) => (
                                    <div
                                        key={i}
                                        className="rn-background-picker-item"
                                        style={{ backgroundImage: `url(${url})` }}
                                        onClick={() => handleSelect('image', url)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rn-background-picker-section">
                            <div className="rn-background-picker-section-title">The MET Museum – Patterns</div>
                            <div className="rn-background-picker-grid images">
                                {MET_MUSEUM_PATTERNS.map((url, i) => (
                                    <div
                                        key={i}
                                        className="rn-background-picker-item"
                                        style={{ backgroundImage: `url(${url})` }}
                                        onClick={() => handleSelect('image', url)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rn-background-picker-section">
                            <div className="rn-background-picker-section-title">Rijksmuseum</div>
                            <div className="rn-background-picker-grid images">
                                {RIJKSMUSEUM.map((url, i) => (
                                    <div
                                        key={i}
                                        className="rn-background-picker-item"
                                        style={{ backgroundImage: `url(${url})` }}
                                        onClick={() => handleSelect('image', url)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rn-background-picker-section">
                            <div className="rn-background-picker-section-title">The MET Museum – Japanese Prints</div>
                            <div className="rn-background-picker-grid images">
                                {MET_MUSEUM_JAPANESE.map((url, i) => (
                                    <div
                                        key={i}
                                        className="rn-background-picker-item"
                                        style={{ backgroundImage: `url(${url})` }}
                                        onClick={() => handleSelect('image', url)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rn-background-picker-section">
                            <div className="rn-background-picker-section-title">The MET Museum</div>
                            <div className="rn-background-picker-grid images">
                                {MET_MUSEUM.map((url, i) => (
                                    <div
                                        key={i}
                                        className="rn-background-picker-item"
                                        style={{ backgroundImage: `url(${url})` }}
                                        onClick={() => handleSelect('image', url)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'upload' && (
                    <div className="rn-background-picker-upload">
                        <div className="rn-background-picker-upload-box">
                            <Upload size={24} />
                            <span>Choose an image or drag & drop</span>
                            <span>or Ctrl+V to paste an image</span>
                            <input type="file" accept="image/*" onChange={handleFileUpload} />
                        </div>
                        <p>Images wider than 1500 pixels work best.</p>
                        <p>The maximum size is 5MB.</p>
                    </div>
                )}

                {tab === 'link' && (
                    <div className="rn-background-picker-link">
                        <form onSubmit={handleLinkSubmit}>
                            <input
                                type="url"
                                placeholder="Paste an image link..."
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <p>Works with any image from the web.</p>
                    </div>
                )}

                {tab === 'settings' && currentData && (
                    <div className="rn-background-picker-scrollable compact-settings">
                        {/* Layout Category */}
                        <div className="rn-settings-group">
                            <div className="rn-settings-group-title">
                                <Layout size={10} />
                                Layout Control
                            </div>

                            <div className="rn-settings-grid">
                                <DebouncedSlider
                                    label="Height"
                                    icon={<MoveVertical size={11} />}
                                    value={currentData.height || globalHeight}
                                    min={100} max={600} step={10} unit="px"
                                    defaultValue={globalHeight}
                                    onCommit={(v) => onUpdateSettings({ height: v })}
                                />
                                <DebouncedSlider
                                    label="Scale"
                                    icon={<Expand size={11} />}
                                    value={currentData.scale || 1}
                                    min={0.5} max={3} step={0.05}
                                    defaultValue={1}
                                    formatValue={(v) => `${v.toFixed(2)}x`}
                                    onCommit={(v) => onUpdateSettings({ scale: v })}
                                />
                                <DebouncedSlider
                                    label="X-Axis"
                                    icon={<MoveHorizontal size={11} />}
                                    value={currentData.xPosition ?? 50}
                                    min={0} max={100} step={1} unit="%"
                                    defaultValue={50}
                                    onCommit={(v) => onUpdateSettings({ xPosition: v })}
                                />

                                <div className="rn-settings-section">
                                    <div className="rn-settings-label-wrapper" style={{ marginBottom: '4px' }}>
                                        <div className="rn-settings-label">
                                            <Repeat size={11} />
                                            Repeat
                                        </div>
                                        {currentData.repeat !== undefined && (
                                            <button
                                                className="rn-btn-reset-small"
                                                onClick={() => onUpdateSettings({ repeat: undefined })}
                                                title="Reset to default"
                                            >
                                                <RotateCcw size={10} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="rn-toggle-wrapper">
                                        <label className="rn-toggle">
                                            <input
                                                type="checkbox"
                                                checked={!!currentData.repeat}
                                                onChange={(e) => {
                                                    const newVal = e.target.checked;
                                                    onUpdateSettings({ repeat: newVal === false ? undefined : true });
                                                }}
                                            />
                                            <span className="rn-toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="rn-settings-section size-mode-section">
                                <div className="rn-settings-label-wrapper" style={{ marginBottom: '6px' }}>
                                    <div className="rn-settings-label">Fitting Mode</div>
                                    {currentData.size !== undefined && (
                                        <button
                                            className="rn-btn-reset-small"
                                            onClick={() => onUpdateSettings({ size: undefined })}
                                            title="Reset to default"
                                        >
                                            <RotateCcw size={10} />
                                        </button>
                                    )}
                                </div>
                                <div className="rn-select-group rn-select-group-5">
                                    {SIZE_MODES.map((s) => (
                                        <button
                                            key={s.value}
                                            className={`rn-select-btn ${(currentData.size || 'cover') === s.value ? 'active' : ''}`}
                                            onClick={() => {
                                                const newVal = s.value;
                                                onUpdateSettings({ size: newVal === 'cover' ? undefined : newVal });
                                            }}
                                            title={s.label}
                                        >
                                            {s.icon}
                                            <span>{s.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Filters Category */}
                        <div className="rn-settings-group">
                            <div className="rn-settings-group-title">
                                <Palette size={10} />
                                Visual Filters
                            </div>

                            <div className="rn-settings-grid">
                                <DebouncedSlider
                                    label="Opacity"
                                    icon={<Eye size={11} />}
                                    value={currentData.opacity ?? 1}
                                    min={0} max={1} step={0.05}
                                    defaultValue={1}
                                    formatValue={(v) => `${Math.round(v * 100)}%`}
                                    onCommit={(v) => onUpdateSettings({ opacity: v })}
                                />

                                <DebouncedSlider
                                    label="Blur"
                                    icon={<Droplets size={11} />}
                                    value={currentData.blur || 0}
                                    min={0} max={20} step={1} unit="px"
                                    defaultValue={0}
                                    onCommit={(v) => onUpdateSettings({ blur: v })}
                                />

                                <DebouncedSlider
                                    label="Brightness"
                                    icon={<Sun size={11} />}
                                    value={currentData.brightness ?? 1}
                                    min={0} max={2} step={0.05}
                                    defaultValue={1}
                                    formatValue={(v) => `${Math.round(v * 100)}%`}
                                    onCommit={(v) => onUpdateSettings({ brightness: v })}
                                />

                                <DebouncedSlider
                                    label="Contrast"
                                    icon={<Contrast size={11} />}
                                    value={currentData.contrast ?? 1}
                                    min={0} max={2} step={0.05}
                                    defaultValue={1}
                                    formatValue={(v) => `${Math.round(v * 100)}%`}
                                    onCommit={(v) => onUpdateSettings({ contrast: v })}
                                />

                                <DebouncedSlider
                                    label="Saturate"
                                    icon={<Sparkles size={11} />}
                                    value={currentData.saturate ?? 1}
                                    min={0} max={3} step={0.05}
                                    defaultValue={1}
                                    formatValue={(v) => `${Math.round(v * 100)}%`}
                                    onCommit={(v) => onUpdateSettings({ saturate: v })}
                                />

                                <DebouncedSlider
                                    label="Hue Rotate"
                                    icon={<RotateCcw size={11} />}
                                    value={currentData.hueRotate || 0}
                                    min={0} max={360} step={1} unit="°"
                                    defaultValue={0}
                                    onCommit={(v) => onUpdateSettings({ hueRotate: v })}
                                />

                                <DebouncedSlider
                                    label="Grayscale"
                                    icon={<Sliders size={11} />}
                                    value={currentData.grayscale || 0}
                                    min={0} max={1} step={0.05}
                                    defaultValue={0}
                                    formatValue={(v) => `${Math.round(v * 100)}%`}
                                    onCommit={(v) => onUpdateSettings({ grayscale: v })}
                                />

                                <DebouncedSlider
                                    label="Sepia"
                                    icon={<Scissors size={11} />}
                                    value={currentData.sepia || 0}
                                    min={0} max={1} step={0.05}
                                    defaultValue={0}
                                    formatValue={(v) => `${Math.round(v * 100)}%`}
                                    onCommit={(v) => onUpdateSettings({ sepia: v })}
                                />

                                <DebouncedSlider
                                    label="Invert"
                                    icon={<Moon size={11} />}
                                    value={currentData.invert || 0}
                                    min={0} max={1} step={0.05}
                                    defaultValue={0}
                                    formatValue={(v) => `${Math.round(v * 100)}%`}
                                    onCommit={(v) => onUpdateSettings({ invert: v })}
                                />
                            </div>
                        </div>

                        {/* Simplified Footer */}
                        <div className="rn-settings-footer compact-footer">
                            <button
                                className={`rn-btn rn-btn-debug ${debugFeedback ? 'active' : ''}`}
                                onClick={handleLogDebug}
                                title="Log current state to console"
                            >
                                <Info size={12} />
                                {debugFeedback ? 'Logged!' : 'Debug'}
                            </button>
                            <button className="rn-btn text-danger" onClick={onResetSettings}>
                                <RotateCcw size={12} />
                                Reset
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
