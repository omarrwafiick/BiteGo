import { Trash2, X } from 'lucide-react';
import SmallButton from '../components/small-button-simple';

export default function ConfirmAction({ visible, result }) {
  if (!visible) return null;

  return (
    <div
      onClick={() => result(false)}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white h-4/12 overflow-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-center w-6/12"
      >
        <X
          size={30}
          color="#FF0000"
          onClick={() => result(false)}
          className="cursor-pointer absolute top-0 right-0 mt-4 me-2 rounded"
        />
        <Trash2
          size={55}
          color="#FF0000"
          onClick={() => result(false)}
          className="cursor-pointer mt-4"
        />
        <h2 className="text-2xl font-bold mt-6!">
          Are you sure you want to commit this action?
        </h2>
        <div className="w-full flex justify-center items-center mt-6">
          <SmallButton name={'ok'} style={'bg-red-400 rounded-lg text-white! text-xl me-2 capitalize'} onClick={() => result(true)} />
          <SmallButton name={'cancel'} style={'bg-blue-400 rounded-lg text-white! text-xl capitalize'} onClick={() => result(false)} />
        </div>
      </div>
    </div>
  );
}
