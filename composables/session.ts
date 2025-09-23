export const useSession = () => {
  const currentUser = useState<any | null>("currentUser", () => null);

  
  return { currentUser };
};

export default useSession;
