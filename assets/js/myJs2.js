function fillActivityForm(json) {
    fillCheckbox("canSupportBonusReward", json);
    fillText("activityNumber", json);
    fillText("activityName", json);
    fillText("accountNote", json);
    fillText("activityDescription", json);
    fillText("activityDescription", json);
    fillCheckbox("shopping", json);
    fillCheckbox("pay", json);
    fillCheckbox("payTax", json);
    fillCardGroup("financialCard", json);
    fillCardGroup("creditCard", json)
    fillText("hostBank", json);
    fillBankGroup("cooperatingBank", json);
    fillBankGroup("participatingBank", json);
    fillText("bonusRewardBankInput", json);
    fillText("activityTotalMoney", json);
    fillText("FiscMoney", json);
    fillText("HostBankMoney", json);
}

function fillText(id, json) {
    if (json[id])
        document.getElementById(id).value = json[id];
}
function fillCheckbox(id, json) {
    if (json[id])
        document.getElementById(id).checked = true;
}
function fillCardGroup(id, json) {
    let group = json[id];
    if (group && group.value) {
        let parent = document.getElementById(id);
        parent.click(); // instead of .checked for trigger onclick event
        for (item in group) {
            if (item === 'value') continue;
            fillCheckbox(item, group);
        }
    }
}
function fillBankGroup(id, json) {
    let group = json[id];
    if (group) {
        for (item in group) {
            fillCheckbox(item, group);
        }
    }
}

function groupCheckboxClicked(event, spanId, cbxIds) {
    let able = event.target.checked;
    let span = document.getElementById(spanId);
    if (able) {
        span.style.color = 'black';
        for (cbxId of cbxIds) {
            let ele = document.getElementById(cbxId);
            ele.disabled = false;
        }
    } else {
        span.style.color = 'gainsboro';
        for (cbxId of cbxIds) {
            let ele = document.getElementById(cbxId);
            ele.disabled = true;
            // ele.checked = false;
        }
    }
}

function groupRadioSpwcificTimeClicked(event) {
    let idClicked = event.target.id

    let perWeekEles = document.querySelectorAll("#perWeekDiv>input");
    let perWeekDiv = document.querySelector("#perWeekDiv");
    if (idClicked !== 'perWeek') {
        perWeekDiv.style.color = 'gainsboro';
        for (ele of perWeekEles) {
            ele.disabled = true;
        }
    }

    let perMonthEles = document.querySelectorAll("#perMonthDiv input");
    let perMonthDiv = document.querySelector("#perMonthDiv");
    if (idClicked !== 'perMonth') {
        perMonthDiv.style.color = 'gainsboro';
        for (ele of perMonthEles) {
            ele.disabled = true;
        }
    }

    let specifiedEles = document.querySelectorAll("#specifiedDiv input");
    let specifiedDiv = document.querySelector("#specifiedDiv");
    if (idClicked !== 'spefcified') {
        specifiedDiv.style.color = 'gainsboro';
        for (ele of specifiedEles) {
            ele.disabled = true;
        }
    }


    switch (event.target.id) {
        case 'perWeek':
            perWeekDiv.style.color = 'black';
            for (ele of perWeekEles) {
                // ele.checked = false;
                ele.disabled = false;
            }
            break;
        case 'perMonth':
            perMonthDiv.style.color = 'black';
            for (ele of perMonthEles) {
                ele.disabled = false;
            }
            break;
        case 'specified':
            specifiedDiv.style.color = 'black';
            for (ele of specifiedEles) {
                ele.disabled = false;
            }
            break;
    }
}

function groupRadioCashbackMethodClicked(event) {
    let idClicked = event.target.id;

    let cashbackMethodFixedDiv = document.getElementById('cashbackMethodFixedDiv');
    let cashbackMethodFixedList = [
        'accumulatingFlagFalse', 'accumulatingFlagFalseValue',
        'accumulatingFlagTrue', 'accumulatingFlagTrueCondition', 'accumulatingFlagTrueCashValue'
    ]
    let cashbackMethodEles = cashbackMethodFixedList.map(id => document.getElementById(id));
    if (idClicked !== 'cashbackMethodFixed') {
        cashbackMethodFixedDiv.style.color = 'gainsboro';
        cashbackMethodEles.forEach(ele => ele.disabled = true);
    }

    let cashbackMethodPercentDiv = document.getElementById('cashbackMethodPercentDiv');
    cashbackMethodPercentList = [
        'cashbackMethodPercentValue',
        'roundOrFloorFlagRound',
        'roundOrFloorFlagFloor',
    ]
    let cashbackMethodPercentEles = cashbackMethodPercentList.map(id => document.getElementById(id));
    if (idClicked !== 'cashbackMethodPercent') {
        cashbackMethodPercentDiv.style.color = 'gainsboro';
        cashbackMethodPercentEles.forEach(ele => ele.disabled = true);
    }

    let cashbackMethodStepDiv = document.getElementById('cashbackMethodStepDiv');
    let cashbackMethodStepAddNewStep = document.getElementById('cashbackMethodStepAddNewStep');
    let cashbackMethodStepEles = document.querySelectorAll('#cashbackMethodStepDiv input');
    if (idClicked !== 'cashbackMethodStep') {
        cashbackMethodStepDiv.style.color = 'gainsboro';
        cashbackMethodStepAddNewStep.disabled = true;
        cashbackMethodStepEles.forEach(ele => ele.disabled = true);
    }

    switch (idClicked) {
        case 'cashbackMethodFixed':
            cashbackMethodFixedDiv.style.color = 'black';
            cashbackMethodEles.forEach(ele => ele.disabled = false);
            break;
        case 'cashbackMethodPercent':
            cashbackMethodPercentDiv.style.color = 'black';
            cashbackMethodPercentEles.forEach(ele => ele.disabled = false);
            break;
        case 'cashbackMethodStep':
            cashbackMethodStepDiv.style.color = 'black';
            cashbackMethodStepAddNewStep.disabled = false;
            cashbackMethodStepEles.forEach(ele => ele.disabled = false);
            break;
    }

}

let addNewStepCount = 1;
function cashbackMethodStepAddNewStepClick() {

    let div = document.createElement('div');
    div.innerHTML = `<div id="cashbackMethodStep${addNewStepCount}">
    新台幣 <input type="text" name="" id="cashbackMethodStep${addNewStepCount}-0" class="row-value-input-text-inline" style="width:100px"> 元 ~
<input type="text" name="" id="cashbackMethodStep${addNewStepCount}-1" class="row-value-input-text-inline" style="width:100px"> 元，回饋
<input type="text" name="" id="cashbackMethodStep${addNewStepCount}-Value" class="row-value-input-text-inline" style="width:100px"> 元</div>`

    // Change this to div.childNodes to support multiple top-level nodes
    newNode = div.firstChild;

    let endNode = document.getElementById('cashbackMethodStepEnd');
    endNode.parentNode.insertBefore(newNode, endNode)
    console.log(addNewStepCount++);
}

function cashbackMethodStepRemove(count) {
    let div = document.getElementById(`cashbackMethodStep${count}`);
    div.parentNode.removeChild(div);
    //todo: 1.add button when adding step; 2. add disabled button logic
}

function cashbackSingleLimitClicked(event) {
    // let div = document.getElementById('cashbackSingleLimitDiv');
    // div.style.color = event.target.checked ? 'black' : 'gainsboro'
    let input = document.getElementById('cashbackSingleLimitValue');
    input.disabled = !event.target.checked
}

function cashbackRestrictionClicked(event) {
    // let div = document.getElementById('cashbackRestrictionDiv');
    // div.style.color = event.target.checked ? 'black' : 'gainsboro';
    let radios = document.querySelectorAll('#cashbackRestrictionDiv > div#cashbackRestrictionDivChild > div > label > input')
    radios.forEach(r => r.disabled = event.target.checked ? false : true);
    let divParents = document.querySelectorAll('#cashbackRestrictionDivChild > div');
    divParents.forEach(d => d.style.color = event.target.checked ? 'black' : 'gainsboro')
}

function cashbackRestrictionChildClicked(event) {
    let divs = document.querySelectorAll('#cashbackRestrictionDivChild > div > div');
    divs.forEach(d => d.style.color = 'gainsboro');
    switch (event.target.id) {
        case 'cashbackRestrictionPerDay':
            document.getElementById('cashbackRestrictionPerDayChildDiv').style.color = 'black';
            break;
        case 'cashbackRestrictionInTheWave':
            document.getElementById('cashbackRestrictionInTheWaveChildDiv').style.color = 'black';
            break;
    }
}





// let json = {
//     "canSupportBonusReward": true,
//     "activityNumber": "202108200117",
//     "activityName": "特店現金回饋活動-單筆回饋",
//     "accountNote": "轉帳註記",
//     "activityDescription": `特店現金回饋活動單筆回饋
// line2
// line3
// line4`,
//     "shopping": true,
//     "pay": false,
//     "payTax": true,
//     "financialCard": {
//         "value": true,
//         "financialCardMainScan": true,
//         "financialCardBeScaned": false,
//     },
//     "creditCard": {
//         "value": true,
//         "creditCardScan": "",
//         "creditCardBeScaned": true
//     },
//     "hostBank": "808",
//     "cooperatingBank": {
//         "cooperatingBank004": true
//     },
//     // "AddingParticipatingBankInput": "",
//     // "AddingParticipationgBankButton": "",
//     "participatingBank": {
//         "participatingBank004": true,
//         "participatingBank006": true,
//         "participatingBank008": false,
//         "participatingBank017": true,
//         "participatingBank050": true,
//         "participatingBank700": true,
//     },
//     "bonusRewardBankInput": "",
//     "activityTotalMoney": 1000000,
//     "FiscMoney": 600000,
//     "HostBankMoney": 400000,
// }

// fillActivityForm(json);

