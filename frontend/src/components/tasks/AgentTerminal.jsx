import { useState, useEffect, useRef } from 'react';
import { Loader2, Play, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

const kindClass = {
  command: 'text-cyan-300',
  info: 'text-gray-400',
  success: 'text-green-400',
  warning: 'text-yellow-300',
  error: 'text-red-400'
};

// Streams an agent's terminal script line-by-line so the demo SHOWS the work
// happening. Each line can emit an activity into the right-sidebar feed via
// onActivity. Calls onComplete once the whole script has played out.
export function AgentTerminal({ script, onActivity, onComplete }) {
  const [started, setStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const run = () => {
    if (started) return;
    setStarted(true);
    setRunning(true);

    let elapsed = 0;
    script.forEach((line, index) => {
      elapsed += line.pause ?? 500;
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (line.activity && onActivity) {
          onActivity(line.activity);
        }
        if (index === script.length - 1) {
          setRunning(false);
          setDone(true);
          onComplete?.();
        }
      }, elapsed);
      timers.current.push(t);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {running ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Agent is working…</span>
            </>
          ) : done ? (
            <>
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Agent finished</span>
            </>
          ) : (
            <span>Ready to run</span>
          )}
        </div>
        {!started && (
          <button
            onClick={run}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Play className="w-4 h-4" />
            Run agent
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="bg-terminal rounded-md p-4 font-mono text-sm h-56 overflow-y-auto"
      >
        {visibleLines.length === 0 && !running && (
          <div className="text-gray-500">
            Press <span className="text-cyan-300">Run agent</span> to start.
          </div>
        )}
        {visibleLines.map((line, index) => (
          <div
            key={index}
            className={cn('whitespace-pre-wrap animate-fadeIn', kindClass[line.kind] || 'text-gray-300')}
          >
            {line.text}
          </div>
        ))}
        {running && (
          <div className="text-gray-500 animate-pulse">▋</div>
        )}
      </div>
    </div>
  );
}
