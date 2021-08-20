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
<input type="text" name="" id="cashbackMethodStep${addNewStepCount}-value" class="row-value-input-text-inline" style="width:100px"> 元</div>`

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
    if (!event.target.checked) {
        let divList = ['cashbackRestrictionPerDayDiv', 'cashbackRestrictionPerDayChildDiv'];
        divList.map(id => document.getElementById(id)).forEach(ele => ele.style.color = 'gainsboro');
        let inputList = ['restrictionPerDayMoney', 'restrictionPerDayCount', 'restrictionInTheWaveMoney', 'restrictionInTheWaveCount',
            'restrictionPerDayMoneyValue', 'restrictionPerDayMoneyCount',
            'restrictionInTheWaveMoneyValue', 'restrictionInTheWaveMoneyCount'
        ];
        inputList.map(id => document.getElementById(id)).forEach(ele => ele.disabled = true);
    }
}

function cashbackRestrictionChildClicked(event) {
    let divs = document.querySelectorAll('#cashbackRestrictionDivChild > div > div');
    let perDayInputs = document.querySelectorAll('#cashbackRestrictionPerDayChildDiv input');
    let inTheWaveInputs = document.querySelectorAll('#cashbackRestrictionInTheWaveChildDiv input');

    divs.forEach(d => d.style.color = 'gainsboro');
    perDayInputs.forEach(ip => ip.disabled = true);
    inTheWaveInputs.forEach(ip => ip.disabled = true);

    switch (event.target.id) {
        case 'cashbackRestrictionPerDay':
            document.getElementById('cashbackRestrictionPerDayChildDiv').style.color = 'black';
            perDayInputs.forEach(ip => ip.disabled = false);
            break;
        case 'cashbackRestrictionInTheWave':
            document.getElementById('cashbackRestrictionInTheWaveChildDiv').style.color = 'black';
            inTheWaveInputs.forEach(ip => ip.disabled = false);
            break;
    }
}




// document.getElementById('')
// document.getElementById('')
function f21() {
    let v1 = 1000;
    let str = `固定金額回饋-不累贈，回饋金額固定為${v1}`;
    document.getElementById('cashbackMethodFixed').click();
    document.getElementById('accumulatingFlagFalse').click();
    document.getElementById('accumulatingFlagFalseValue').value = v1
    console.log(str);
}
function f22() {
    let v1 = 100;
    let v2 = 10;
    let str = `固定金額回饋-可累贈，交易金額每滿${v1}元，回饋${v2}元`
    document.getElementById('cashbackMethodFixed').click();
    document.getElementById('accumulatingFlagTrue').click();
    document.getElementById('accumulatingFlagTrueCondition').value = v1;
    document.getElementById('accumulatingFlagTrueCashValue').value = v2;
    console.log(str);
}
function f23() {
    let v1 = '10';
    let str = ` 回饋比例:${v1}%-小數點後四捨五入`
    document.getElementById('cashbackMethodPercent').click();
    document.getElementById('cashbackMethodPercentValue').value = v1;
    document.getElementById('roundOrFloorFlagRound').click();
    console.log(str);
}
function f24() {
    let v1 = '10';
    let str = ` 回饋比例:${v1}%-小數點無條件捨取去`
    document.getElementById('cashbackMethodPercent').click();
    document.getElementById('cashbackMethodPercentValue').value = v1;
    document.getElementById('roundOrFloorFlagFloor').click();
    console.log(str);
}
function f25() {
    let v01 = 100, v02 = 1000, v03 = 10;
    let v11 = 1001, v12 = 2000, v13 = 20;
    let v21 = 2001, v23 = 50;
    let str = `級距回饋:
新台幣${v01}元 ~ ${v02}元，回饋${v03}元
新台幣${v11}元 ~ ${v12}元，回饋${v13}元
新台幣${v21}元以上，回饋${v23}元`;
    document.getElementById('cashbackMethodStep').click();
    document.getElementById('cashbackMethodStepAddNewStep').click();

    document.getElementById('cashbackMethodStepStart0').value = v01;
    document.getElementById('cashbackMethodStepStart1').value = v02;
    document.getElementById('cashbackMethodStepStartValue').value = v03;

    document.getElementById('cashbackMethodStep1-0').value = v11;
    document.getElementById('cashbackMethodStep1-1').value = v12;
    document.getElementById('cashbackMethodStep1-value').value = v13;

    document.getElementById('cashbackMethodStepEnd0').value = v21;
    document.getElementById('cashbackMethodStepEndValue').value = v23;
    console.log(str);
}

function f311() {
    let str = `回饋上限-不勾選單筆回饋上限`;
    console.log(str);
}
function f312() {
    let v1 = 1000;
    let str = `回饋上限-符合條件之單筆回饋上限為${v1}元`
    document.getElementById('cashbackSingleLimit').click();
    document.getElementById('cashbackSingleLimitValue').value = v1;
    console.log(str);
}


function f321() {
    let str = `回饋上限-不勾選限定條件`
    console.log(str);
}
function f322() {
    let v1 = 100;
    let str = `回饋上限-每日-最高回饋:${v1}元`
    document.getElementById('cashbackRestriction').click();
    document.getElementById('cashbackRestrictionPerDay').click();
    document.getElementById('restrictionPerDayMoney').click();
    document.getElementById('restrictionPerDayMoneyValue').value = v1;
    console.log(str);
}
function f323() {
    let v1 = 10;
    let str = `回饋上限-每日-最多回饋:${v1}次`
    document.getElementById('cashbackRestriction').click();
    document.getElementById('cashbackRestrictionPerDay').click();
    document.getElementById('restrictionPerDayCount').click();
    document.getElementById('restrictionPerDayMoneyCount').value = v1;
    console.log(str);
}
function f324() {
    let v1 = 100;
    let str = `回饋上限-此波活動期間-最高回饋:${v1}元`
    document.getElementById('cashbackRestriction').click();
    document.getElementById('cashbackRestrictionInTheWave').click();
    document.getElementById('restrictionInTheWaveMoney').click();
    document.getElementById('restrictionInTheWaveMoneyValue').value = v1;
    console.log(str);
}
function f325() {
    let v1 = 10;
    let str = `回饋上限-此波活動期間-最多回饋:${v1}次`
    document.getElementById('cashbackRestriction').click();
    document.getElementById('cashbackRestrictionInTheWave').click();
    document.getElementById('restrictionInTheWaveCount').click();
    document.getElementById('restrictionInTheWaveMoneyCount').value = v1;
    console.log(str);
}