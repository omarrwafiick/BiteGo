export default function CustomeTable({ colsNames, data, nameEdit=null, nameDelete=null, isDelete = false, isEdit = false, onDelete, onEdit, setData }) {
  return (
    <div className="relative w-full overflow-x-auto rounded-sm">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {colsNames.map((col, index) => (
              <th key={index} className="px-6 py-3 capitalize">{col}</th>
            ))}
            {(isEdit || isDelete) && <th className="px-6 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white dark:bg-gray-800 border-b">
              {colsNames.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 capitalize">
                  {row[col] ?? '—'}
                </td>
              ))}
              {(isEdit || isDelete) && (
                <td className="px-6 py-4">
                  {isEdit && (
                    <a
                      onClick={() => onEdit ? onEdit(row) : setData(row)}
                      className="bg-blue-600 text-white! px-3 py-1 rounded mx-1 cursor-pointer capitalize"
                    >
                      { nameEdit && nameEdit.trim() !== '' ? nameEdit : 'edit' }
                    </a>
                  )}
                  {isDelete && (
                    <a
                      onClick={() => onDelete?.(row)}
                      className="bg-red-600 text-white! px-3 py-1 rounded mx-1 cursor-pointer capitalize"
                    >
                      { nameDelete && nameDelete.trim() !== '' ? nameDelete : 'delete' }
                    </a>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
