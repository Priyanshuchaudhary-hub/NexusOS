import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { FileSpreadsheet, X, UploadCloud, FileText } from 'lucide-react';

export const CSVImportModal = () => {
  const { activeModal, setActiveModal, importDSACSV, data } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';

  const sampleCSV = `Title,Platform,Difficulty,Topic
Rotting Oranges,LeetCode,Medium,Graphs (BFS/DFS/Dijkstra)
Subarray Sum Equals K,LeetCode,Medium,Arrays & Strings
Merge Intervals,LeetCode,Medium,Arrays & Strings
Invert Binary Tree,LeetCode,Easy,Trees & Binary Search Trees
Climbing Stairs,LeetCode,Easy,Dynamic Programming`;

  const [csvText, setCsvText] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal === 'csvImport') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'csvImport') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!csvText.trim()) return;
    importDSACSV(csvText);
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-emerald">
                <FileSpreadsheet size={12} /> Batch CSV Ingestion (PRD 7.4)
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isHinglish ? 'DSA Problems CSV Import' : 'Import DSA Problems from CSV'}
            </h3>
          </div>
          <button onClick={() => setActiveModal(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.45 }}>
          {isHinglish
            ? 'LeetCode ka official API na hone ke kaaran, PRD v0.1 CSV batch import allow karta hai. Neeche CSV paste karein ya sample load karein.'
            : 'Per PRD 7.4 specifications, batch import allows importing previously solved problems from spreadsheets, Striver SDE checklists, or exports.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                CSV Format (Header: Title, Platform, Difficulty, Topic):
              </label>
              <button
                type="button"
                onClick={() => setCsvText(sampleCSV)}
                className="btn btn-ghost"
                style={{ fontSize: '0.725rem', padding: '2px 8px', color: 'var(--accent-cyan)' }}
              >
                Paste Sample CSV
              </button>
            </div>
            <textarea
              rows={6}
              required
              className="input-field"
              placeholder={sampleCSV}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', resize: 'vertical' }}
            />
          </div>

          <div className="modal-actions-bar">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UploadCloud size={15} />
              <span>Import Records</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
