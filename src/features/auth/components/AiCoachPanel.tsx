import { api } from "../../../shared/api";
import { useState } from "react";
import Button from "../../../components/button";

export default function AiCoachPanel() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        if (!question.trim()) return;

        setLoading(true);
        setAnswer("");

        try {
            const response = await api.post(
                "/api/ai/training-advice",
                { question }
            );

            setAnswer(response.data.answer);
            setQuestion("");

        } catch (error) {
            console.error(error);
            setAnswer("Server is waking up... please try again.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/85 backdrop-blur-md shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-12">


            <h2 className="text-2xl font-bold text-center mb-4 ">
                🤖 AI Boxing Coach
            </h2>

            <p className="text-center text-gray-800 mb-4">
                Ask the AI for boxing training advice
            </p>

            <textarea
                className="w-full border rounded p-3 mb-4 resize-none"
                rows={3}
                placeholder="How can I improve punching speed?"
                value={question}
                onChange={(e) => {
                    setQuestion(e.target.value);
                    setAnswer("");
                }}
            />

            <div className="flex justify-center">
                <Button
                    name={loading ? "Thinking..." : "Ask AI"}
                    type="button"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                    onClick={askAI}
                />
            </div>
            <div className="mt-4 min-h-[120px]">

                {loading && (
                    <div className="p-4 bg-gray-100 rounded text-center text-gray-500">
                        🤖 Thinking...
                    </div>
                )}

                {!loading && answer && (
                    <div className="p-4 bg-gray-100 rounded text-base leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">                        {answer}
                    </div>
                )}

                {!loading && !answer && (
                    <div className="p-4 text-center text-gray-400">
                        Ask a question to get advice
                    </div>
                )}
            </div>

        </div>
    );
}
