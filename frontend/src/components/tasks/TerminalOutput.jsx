export function TerminalOutput({ output }) {
  if (!output) return null;

  return (
    <div className="bg-terminal rounded-md p-4 font-mono text-sm text-green-400 overflow-x-auto">
      {output.split('\n').map((line, index) => (
        <div key={index} className="whitespace-pre">
          {line}
        </div>
      ))}
    </div>
  );
}
