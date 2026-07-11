export default function Answers({ answers, answerState, onSelectAnswer, onSelect }) {
    return (
        <ul id="answers">
            {answers.map((answer, index) => {
                const isSelected = onSelectAnswer === answer;
                const showInactive = onSelectAnswer !== undefined && onSelectAnswer !== null && answerState !== '';
                let cssClass = '';

                if (answerState === 'answer' && isSelected) {
                    cssClass = 'selected';
                }

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                if (showInactive && !isSelected) {
                    cssClass += (cssClass ? ' ' : '') + 'inactive';
                }

                return (
                    <li key={`${answer}-${index}`} className="answer">
                        <button type="button" className={cssClass.trim()} onClick={() => onSelect(answer)}>
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}