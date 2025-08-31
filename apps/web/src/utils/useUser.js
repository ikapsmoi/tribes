import * as React from "react";

const useUser = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchUser = React.useCallback(async () => {
    try {
      const response = await fetch("/api/auth/token");
      if (response.ok) {
        const data = await response.json();
        setUser(data?.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = React.useCallback(() => {
    setLoading(true);
    fetchUser();
  }, [fetchUser]);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    data: user,
    loading,
    refetch,
  };
};

export { useUser };

export default useUser;
