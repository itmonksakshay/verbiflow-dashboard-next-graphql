import { getEventSchemaName, IEventSchema  } from '@/lib/gqls';
import { useState, useEffect } from 'react';
import { getApolloClient } from "@/lib/apolloClient";


// Custom hook to fetch event schema name
export function useEventSchema(eventSchemaId: number) {
    const [eventSchema, setEventSchema] = useState<null |IEventSchema> (null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const client = getApolloClient()
    useEffect(() => {
      const fetchEventSchema = async () => {
        try {
          setLoading(true);
          const eventSchemaObj = await getEventSchemaName({
            client,
            id: Number(eventSchemaId),
            timezoneOffset: "0",
          });
          setEventSchema(eventSchemaObj);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchEventSchema();
    }, [eventSchemaId,client]);
  
    return { eventSchema, loading, error };
}
