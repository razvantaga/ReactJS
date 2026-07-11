import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode = 'normal' }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        setRemainingTime(timeout);
    }, [timeout]);

    useEffect(() => {
        if (timeout <= 0) {
            return;
        }

        const timer = setTimeout(() => {
            onTimeout();
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);

    useEffect(() => {
        if (timeout <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setRemainingTime((prev) => {
                const next = prev - 100;
                if (next <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [timeout]);

    return (
        <progress id="question-time" data-mode={mode} max={timeout} value={remainingTime} />
    );
}