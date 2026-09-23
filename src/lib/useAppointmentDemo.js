import { useCallback, useEffect, useState } from "react";
import { DEMO_STORAGE_KEY, loadDemoState, saveDemoState } from "@/lib/appointmentDemoStore";

export default function useAppointmentDemo() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(loadDemoState());

    const refresh = (event) => {
      if (event?.key && event.key !== DEMO_STORAGE_KEY) return;
      setState(loadDemoState());
    };

    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  const commit = useCallback((next) => {
    setState(saveDemoState(next));
  }, []);

  return [state, commit];
}
