function ErrorMessage({ message }: { message?: string }) {
  return <p className="text-red-500 text-xs mt-1 h-4">{message}</p>;
}

export default ErrorMessage;
