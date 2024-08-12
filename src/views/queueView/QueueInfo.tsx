export default function QueueInfo() {
  return (
    <ul className="space-y-2">
      <li>
        - Use the <strong className="text-app-yellow">Enqueue</strong> button to
        add an element to the end of the queue.
      </li>
      <li>
        - Use the <strong className="text-app-yellow">Dequeue</strong> button to
        remove an element from the beginning of the queue.
      </li>
      <li>
        - Use the <strong className="text-app-yellow">Clear</strong> button to
        empty the queue.
      </li>
    </ul>
  );
}
