import { getVariantNames, IVariantName  } from '@/lib/gqls';
import { useState, useEffect } from 'react';
import { getApolloClient } from "@/lib/apolloClient";


// Custom hook to fetch event schema name
export function useVariantList(experimentId: number) {
    const [variantNames, setVariantNames] = useState<null |IVariantName> (null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const client = getApolloClient()
    useEffect(() => {
      const fetchEventSchema = async () => {
        try {
          setLoading(true);
          const variantNamesObj = await getVariantNames({
            client,
            experimentId: Number(experimentId)
          });
          setVariantNames(variantNamesObj);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchEventSchema();
    }, [experimentId,client]);
  
    return { variantNames, loading, error };
}
