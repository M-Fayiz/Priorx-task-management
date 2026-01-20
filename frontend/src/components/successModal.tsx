

interface SimpleVerificationModalProps {
  open: boolean
  email: string
  onClose: () => void
}

const SimpleVerificationModal: React.FC<SimpleVerificationModalProps> = ({
  open,
  email,
  onClose,
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Check your email
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          A verification token has been sent to{" "}
          <span className="font-medium text-gray-800">{email}</span>.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-kosma-dgray text-white py-2 rounded-md hover:bg-kosma-gray transition"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default SimpleVerificationModal
