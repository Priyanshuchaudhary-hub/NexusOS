import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Code2, X, Plus } from 'lucide-react';

export const LogDSAModal = () => {
  const { activeModal, setActiveModal, logDSAProblem, data } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';

  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('LeetCode');
  const [difficulty, setDifficulty] = useState('Medium');
  const [topic, setTopic] = useState('Trees & Binary Search Trees');
  const [timeSpentMins, setTimeSpentMins] = useState('30');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal === 'logDSA') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'logDSA') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    logDSAProblem({
      title,
      platform,
      difficulty,
      topic,
      timeSpentMins: Number(timeSpentMins) || 30,
      url: url.trim() || undefined
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-emerald">
                <Code2 size={12} /> SDE Repository
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isHinglish ? 'Solved DSA Problem Log Karein' : 'Log Solved DSA Problem'}
            </h3>
          </div>
          <button onClick={() => setActiveModal(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Problem Title:
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="e.g. Binary Tree Maximum Path Sum"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-grid-2col">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Platform:
              </label>
              <select
                className="input-field"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="LeetCode">LeetCode</option>
                <option value="Codeforces">Codeforces</option>
                <option value="GeeksforGeeks">GeeksforGeeks</option>
                <option value="InterviewBit">InterviewBit</option>
                <option value="CSES">CSES</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Difficulty:
              </label>
              <select
                className="input-field"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2col">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Topic Category:
              </label>
              <select
                className="input-field"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="Arrays & Strings">Arrays & Strings</option>
                <option value="Two Pointers & Sliding Window">Two Pointers</option>
                <option value="Trees & Binary Search Trees">Trees & BST</option>
                <option value="Graphs (BFS/DFS/Dijkstra)">Graphs</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
                <option value="Trie & Bit Manipulation">Trie & Bits</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Time Spent (Minutes):
              </label>
              <input
                type="number"
                min="5"
                max="180"
                className="input-field"
                value={timeSpentMins}
                onChange={(e) => setTimeSpentMins(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Problem Link (Optional):
            </label>
            <input
              type="url"
              className="input-field"
              placeholder="https://leetcode.com/problems/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              <Plus size={15} />
              <span>{isHinglish ? 'Log Karein' : 'Log Problem'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
