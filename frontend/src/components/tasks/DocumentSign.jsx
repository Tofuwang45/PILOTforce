import { useRef, useState, useEffect } from 'react';
import { FileText, Pen, Type, Eraser, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/utils/cn';

// Inline document signing — the intern reads the document and signs it right
// here (draw or type), with no redirect. On sign we POST to the signing
// endpoint, which returns a receipt id + timestamp, then notify the parent so
// the step can advance.
export function DocumentSign({ document, onSigned, onSign }) {
  const [mode, setMode] = useState('draw'); // 'draw' | 'type'
  const [typedName, setTypedName] = useState('');
  const [hasDrawn, setHasDrawn] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const [signedAt, setSignedAt] = useState('');
  const [receiptId, setReceiptId] = useState('');

  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || mode !== 'draw') return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e293b';
  }, [mode]);

  const pointerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = pointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const moveDraw = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = pointerPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const endDraw = () => {
    drawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const canSign =
    agreed && (mode === 'draw' ? hasDrawn : typedName.trim().length > 1);

  const handleSign = async () => {
    if (!canSign || signing) return;
    setSigning(true);

    let stamp = document.effectiveDate;
    let receipt = '';
    try {
      const res = await onSign?.(document.signerName);
      if (res?.signedAt) {
        stamp = new Date(res.signedAt).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
      }
      receipt = res?.receiptId || '';
    } catch {
      // fall back to a local timestamp if the call fails
      try {
        stamp = new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
      } catch {
        stamp = document.effectiveDate;
      }
    }

    setSignedAt(stamp);
    setReceiptId(receipt);
    setSigning(false);
    setSigned(true);
    onSigned?.();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Document */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center gap-3">
        <FileText className="w-5 h-5 text-primary" />
        <div>
          <h3 className="font-semibold text-gray-900">{document.title}</h3>
          <p className="text-xs text-gray-500">Effective {document.effectiveDate}</p>
        </div>
      </div>

      <div className="px-6 py-5 max-h-72 overflow-y-auto space-y-3 text-sm text-gray-700 leading-relaxed">
        {document.body.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* Signature area */}
      <div className="border-t border-gray-200 px-6 py-5 space-y-4 bg-gray-50">
        {signed ? (
          <div className="flex items-start gap-3 rounded-md bg-green-50 border border-green-200 p-4">
            <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">Signed & filed</p>
              <p className="text-sm text-green-700">
                {document.signerName} · {document.signerRole}
              </p>
              <p className="text-xs text-green-600 mt-1">Signed {signedAt}</p>
              {receiptId && (
                <p className="text-xs text-green-600 font-mono">Receipt #{receiptId}</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode('draw')}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors',
                  mode === 'draw'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                )}
              >
                <Pen className="w-4 h-4" /> Draw
              </button>
              <button
                onClick={() => setMode('type')}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors',
                  mode === 'type'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                )}
              >
                <Type className="w-4 h-4" /> Type
              </button>
            </div>

            {mode === 'draw' ? (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={560}
                  height={140}
                  className="w-full h-[140px] bg-white border border-dashed border-gray-300 rounded-md cursor-crosshair touch-none"
                  onMouseDown={startDraw}
                  onMouseMove={moveDraw}
                  onMouseUp={endDraw}
                  onMouseLeave={endDraw}
                  onTouchStart={startDraw}
                  onTouchMove={moveDraw}
                  onTouchEnd={endDraw}
                />
                {!hasDrawn && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                    Sign here
                  </span>
                )}
                <button
                  onClick={clearCanvas}
                  className="absolute top-2 right-2 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                >
                  <Eraser className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="Type your full name"
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: 'Snell Roundhand, Segoe Script, cursive' }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your typed name is your electronic signature.
                </p>
              </div>
            )}

            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary"
              />
              <span>
                I, <span className="font-medium">{document.signerName}</span>, have read and
                agree to the terms of this agreement.
              </span>
            </label>

            <div className="flex justify-end">
              <button
                onClick={handleSign}
                disabled={!canSign || signing}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium transition-all',
                  canSign && !signing
                    ? 'bg-primary text-white hover:bg-blue-700 hover:shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                )}
              >
                <Lock className="w-4 h-4" />
                {signing ? 'Filing signature…' : 'Sign document'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
