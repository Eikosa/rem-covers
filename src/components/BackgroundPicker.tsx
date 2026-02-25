import React, { useState, useEffect, useRef } from 'react';
import { DefaultBackgroundState } from '../utils/storage';
import { Upload, Link, X, Image as ImageIcon } from 'lucide-react';

interface BackgroundPickerProps {
    onSelect: (state: DefaultBackgroundState | null) => void;
    onClose: () => void;
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

export const BackgroundPicker: React.FC<BackgroundPickerProps> = ({ onSelect, onClose }) => {
    const [tab, setTab] = useState<'gallery' | 'upload' | 'link'>('gallery');
    const [linkUrl, setLinkUrl] = useState('');
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

    return (
        <div className="rn-background-picker-container" ref={containerRef} onClick={(e) => e.stopPropagation()}>
            <div className="rn-background-picker-header">
                <div className="rn-background-picker-tabs">
                    <button className={tab === 'gallery' ? 'active' : ''} onClick={() => setTab('gallery')}>
                        Gallery
                    </button>
                    <button className={tab === 'upload' ? 'active' : ''} onClick={() => setTab('upload')}>
                        Upload
                    </button>
                    <button className={tab === 'link' ? 'active' : ''} onClick={() => setTab('link')}>
                        Link
                    </button>
                </div>
                <button className="rn-background-picker-remove" onClick={() => onSelect(null)}>
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
            </div>
        </div>
    );
};
