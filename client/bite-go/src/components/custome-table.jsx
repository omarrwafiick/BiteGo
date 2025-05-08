export default function CustomeTable({ colsNames, data, actions }) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {colsNames?.map((col, index) => (
              <th key={index} className="px-6 py-3 capitalize">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white dark:bg-gray-800 border-b">
              {colsNames.map((col, colIndex) => {
                  const key = normalizeKey(col); 
                  if (key === 'actions') {
                    return (
                      <td key={colIndex} className="px-6 py-4 capitalize">
                        {typeof actions === 'function' ? action(row) : actions}
                      </td>
                    );
                  } 
                  return (
                    <td key={colIndex} className="px-6 py-4 capitalize">
                      {row[key] ?? '—'}
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
function normalizeKey(label) {
  return label;    
}
