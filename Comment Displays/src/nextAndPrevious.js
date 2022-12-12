import $ from 'jquery';

export default function nextAndPrevious(fetchArray, currentLi, clickFunction, buttonDiv, userBoolean, outerDiv) {

    const amountDisplayed = 3;
    let index = 0;
    const nextButton = $(`<button class="next">Next</button>`);
    const backButton = $(`<button class="back">Previous</button>`);
    backButton.appendTo(buttonDiv);
    nextButton.appendTo(buttonDiv);

    for (let i = index; i < amountDisplayed; i++) {
        clickFunction(fetchArray[i], outerDiv, currentLi);
    }

    nextButton.on('click', (event) => {
        event.stopPropagation();
        if (index < fetchArray.length) {
            if (userBoolean === false) {
                outerDiv.empty();
            } else {
                currentLi.empty();
            }
            index = (index + amountDisplayed) < fetchArray.length ? index += amountDisplayed : index;
            for (let i = index; i < index + amountDisplayed; i++) {
                if (fetchArray[i]) {
                    clickFunction(fetchArray[i], outerDiv, currentLi);
                }
            }

        } else {
            for (let i = index; i <= fetchArray.length - 1; i++) {
                clickFunction(fetchArray[i], outerDiv, currentLi);
            }
            index += (fetchArray.length - index);
        }
    });

    backButton.on('click', (event) => {
        event.stopPropagation();
        if (index > 0) {
            if (userBoolean === false) {
                outerDiv.empty();
            } else {
                currentLi.empty();
            }
            index = index - amountDisplayed;
            for (let i = index; i < index + amountDisplayed; i++) {
                clickFunction(fetchArray[i], outerDiv, currentLi);
            }
        } else {
            console.error('under 0');
        }
    });
}