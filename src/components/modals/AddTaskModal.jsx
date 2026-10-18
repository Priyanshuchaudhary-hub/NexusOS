import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Plus, X, Clock, Layers } from 'lucide-react';

export const AddTaskModal = () => {
  const { activeModal, setActiveModal, addTask, data } = useNexus();
  const isHinglish = data.user.preferredLanguage === 'hinglish';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA');
  const [estMinutes, setEstMinutes] = useState('45');
  const [priority, setPriority] = useState('high');
  const [dueTime, setDueTime] = useState('Today, 07:00 PM');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal === 'addTask') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'addTask') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      category,
      estMinutes,
      priority,
      dueTime,
      notes
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {isHinglish ? 'Naya Task Jodein' : 'Schedule New Task'}
          </h3>
          <button onClick={() => setActiveModal(null)} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Task Title:
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="e.g. Solve 2 LeetCode Mediums on Graphs (Topological Sort)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-grid-2col">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Category:
              </label>
              <select
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="DSA">DSA Practice</option>
                <option value="Classroom">Classroom & Coursework</option>
                <option value="Project">AI / Development Project</option>
                <option value="Revision">Revision / Core CS</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Est. Minutes:
              </label>
              <input
                type="number"
                min="10"
                max="300"
                className="input-field"
                value={estMinutes}
                onChange={(e) => setEstMinutes(e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Priority:
              </label>
              <select
                className="input-field"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">High</option>
                <option value="critical">Critical Deadline</option>
                <option value="medium">Medium</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Due Timing:
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Today, 08:00 PM"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Notes / Sub-tasks (Optional):
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Test with Kahn's BFS algorithm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              <span>{isHinglish ? 'Task Save Karein' : 'Schedule Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
