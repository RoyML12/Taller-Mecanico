export default function Toast({ message, type = 'success', visible }) {
  if (!visible) return null;

  return <div className={`toast ${type}`}>{message}</div>;
}
