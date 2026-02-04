export default function CustomerList({ customers, onDelete }: any) {
  return (
    <ul>
      {customers.map((c: any) => (
        <li key={c.id}>
          <strong>{c.name}</strong> — {c.companyName}
          <button onClick={() => onDelete(c.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}