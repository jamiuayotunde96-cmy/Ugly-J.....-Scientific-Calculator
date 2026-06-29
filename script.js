const display = document.getElementById("display");
let lastResult = "";
let angleMode = "deg";

function toRadians(value) {
    return value * Math.PI / 180;
}

function angleInput(value) {
    if (angleMode === "rad") return value;
    if (angleMode === "grad") return value * Math.PI / 200;
    return toRadians(value);
}

function angleOutput(value) {
    if (angleMode === "rad") return value;
    if (angleMode === "grad") return value * 200 / Math.PI;
    return value * 180 / Math.PI;
}

window.sin = function (x) {
    return Math.sin(angleInput(Number(x)));
};
window.cos = function (x) {
    return Math.cos(angleInput(Number(x)));
};
window.tan = function (x) {
    return Math.tan(angleInput(Number(x)));
};
window.arcsin = function (x) {
    return angleOutput(Math.asin(Number(x)));
};
window.arccos = function (x) {
    return angleOutput(Math.acos(Number(x)));
};
window.arctan = function (x) {
    return angleOutput(Math.atan(Number(x)));
};
window.log = function (x) {
    return Math.log10(Number(x));
};
window.ln = function (x) {
    return Math.log(Number(x));
};
window.antilog = function (x) {
    return Math.pow(10, Number(x));
};
window.sqrt = function (x) {
    return Math.sqrt(Number(x));
};
window.recip = function (x) {
    return 1 / Number(x);
};
window.fact = function (x) {
    const n = Number(x);
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Invalid input for factorial");
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
};
window.P = function (n, r) {
    const nn = Number(n);
    const rr = Number(r);
    if (!Number.isInteger(nn) || !Number.isInteger(rr) || nn < 0 || rr < 0 || rr > nn) {
        throw new Error("Invalid input for permutation");
    }
    let result = 1;
    for (let i = 0; i < rr; i++) {
        result *= (nn - i);
    }
    return result;
};
window.C = function (n, r) {
    return window.P(n, r) / window.fact(r);
};
window.mod = function (a, b) {
    return Number(a) % Number(b);
};

function focusDisplay() {
    display.focus();
    display.style.caretColor = "black";
    const length = display.value.length;
    try {
        display.setSelectionRange(length, length);
    } catch (e) {
        // ignore if selection range is not available
    }

    setTimeout(function () {
        display.focus();
        try {
            display.setSelectionRange(length, length);
        } catch (e) {
            // ignore if selection range is not available
        }
    }, 0);
}

function appendToDisplay(value) {
    display.value = display.value + value;
    focusDisplay();
}

function insertImplicitMultiplication(expression) {
    let result = "";
    for (let i = 0; i < expression.length; i++) {
        const current = expression[i];
        const next = expression[i + 1];
        result += current;

        const shouldMultiply =
            current &&
            next &&
            /[0-9.π)]/.test(current) &&
            /[0-9π(A-Za-z(]/.test(next);

        if (shouldMultiply) {
            result += "*";
        }
    }
    return result;
}

function normalizeExpression(expression) {
    let safeExpression = expression.trim();
    safeExpression = safeExpression.replace(/([0-9.π)]+)\s*P\s*([0-9.π(]+)/g, "P($1,$2)");
    safeExpression = safeExpression.replace(/([0-9.π)]+)\s*C\s*([0-9.π(]+)/g, "C($1,$2)");
    safeExpression = safeExpression.replace(/([0-9.]+)\s*mod\s*\(?\s*([0-9.]+)\)?/gi, "mod($1,$2)");
    safeExpression = safeExpression.replace(/([0-9.]+)!/g, "fact($1)");
    safeExpression = insertImplicitMultiplication(safeExpression);
    safeExpression = safeExpression.replace(/π/g, "Math.PI");
    safeExpression = safeExpression.replace(/([0-9.)])Math\.PI/g, "$1*Math.PI");
    safeExpression = safeExpression.replace(/\^/g, "**");
    return safeExpression;
}

window.normalizeExpression = normalizeExpression;
window.balanceParentheses = balanceParentheses;

function balanceParentheses(expression) {
    let openCount = 0;
    for (const char of expression) {
        if (char === "(") {
            openCount += 1;
        } else if (char === ")") {
            openCount = Math.max(0, openCount - 1);
        }
    }
    return expression + ")".repeat(openCount);
}

const button7 = document.getElementById("btn7");
button7.addEventListener("click", function () {
    appendToDisplay("7");
});

const button8 =
document.getElementById("btn8");
button8.addEventListener("click", function () {
    appendToDisplay("8");
});

const button9 =
document.getElementById("btn9");
button9.addEventListener("click", function () {
    appendToDisplay("9");
});

const button4 =
document.getElementById("btn4");
button4.addEventListener("click", function () {
    appendToDisplay("4");
});

const button5 =
document.getElementById("btn5");
button5.addEventListener("click", function () {
    appendToDisplay("5");
});

const button6 =
document.getElementById("btn6");
button6.addEventListener("click", function () {
    appendToDisplay("6");
});

const button1 =
document.getElementById("btn1");
button1.addEventListener("click", function () {
    appendToDisplay("1");
});

const button2 =
document.getElementById("btn2");
button2.addEventListener("click", function () {
    appendToDisplay("2");
});

const button3 =
document.getElementById("btn3");
button3.addEventListener("click", function () {
    appendToDisplay("3");
});

const button0 =
document.getElementById("btn0");
button0.addEventListener("click", function () {
    appendToDisplay("0");
});

const buttonDot = document.getElementById("btnDot");
buttonDot.addEventListener("click", function () {
    appendToDisplay(".");
});

const buttonDEL = document.getElementById("btnDEL");
buttonDEL.addEventListener("click", function () {
    display.value = display.value.slice(0, -1);
    focusDisplay();
});

const buttonAC =
document.getElementById("btnAC");
buttonAC.addEventListener("click", function () {
    display.value = "";
    focusDisplay();
});

const buttonAdd =
document.getElementById("btnAdd");
buttonAdd.addEventListener("click", function () {
    appendToDisplay("+");
});

const buttonSub =
document.getElementById("btnSub");
buttonSub.addEventListener("click", function () {
    appendToDisplay("-");
});

const buttonMul =
document.getElementById("btnMul");
buttonMul.addEventListener("click", function () {
    appendToDisplay("*");
});

const buttonDiv =
document.getElementById("btnDiv");
buttonDiv.addEventListener("click", function () {
    appendToDisplay("/");
});

const buttonEXP = document.getElementById("btnEXP");
buttonEXP.addEventListener("click", function () {
    appendToDisplay("E");
});

const buttonSin = document.getElementById("btnSin");
buttonSin.addEventListener("click", function () {
    appendToDisplay("sin(");
});

const buttonCos = document.getElementById("btnCos");
buttonCos.addEventListener("click", function () {
    appendToDisplay("cos(");
});

const buttonTan = document.getElementById("btnTan");
buttonTan.addEventListener("click", function () {
    appendToDisplay("tan(");
});

const buttonArcsin = document.getElementById("btnArcsin");
buttonArcsin.addEventListener("click", function () {
    appendToDisplay("arcsin(");
});

const buttonArcos = document.getElementById("btnArcos");
buttonArcos.addEventListener("click", function () {
    appendToDisplay("arccos(");
});

const buttonArctan = document.getElementById("btnArctan");
buttonArctan.addEventListener("click", function () {
    appendToDisplay("arctan(");
});

const buttonLog = document.getElementById("btnLog");
buttonLog.addEventListener("click", function () {
    appendToDisplay("log(");
});

const buttonAntilog = document.getElementById("btnAntilog");
buttonAntilog.addEventListener("click", function () {
    appendToDisplay("antilog(");
});

const buttonLn = document.getElementById("btnLn");
buttonLn.addEventListener("click", function () {
    appendToDisplay("ln(");
});

const buttonSqrt = document.getElementById("btnSqrt");
buttonSqrt.addEventListener("click", function () {
    appendToDisplay("sqrt(");
});

const buttonSquare = document.getElementById("btnsquare");
buttonSquare.addEventListener("click", function () {
    appendToDisplay("**2");
});

const buttonRecip = document.getElementById("btnRecip");
buttonRecip.addEventListener("click", function () {
    appendToDisplay("recip(");
});

const buttonCube = document.getElementById("btnCube");
buttonCube.addEventListener("click", function () {
    appendToDisplay("**3");
});

const buttonPow = document.getElementById("btnPow");
buttonPow.addEventListener("click", function () {
    appendToDisplay("^");
});

const buttonFact = document.getElementById("btnFact");
buttonFact.addEventListener("click", function () {
    appendToDisplay("!");
});

const buttonPermute = document.getElementById("btnPermute");
buttonPermute.addEventListener("click", function () {
    appendToDisplay("P");
});

const buttonComb = document.getElementById("btnComb");
buttonComb.addEventListener("click", function () {
    appendToDisplay("C");
});

const buttonMod = document.getElementById("btnMod");
buttonMod.addEventListener("click", function () {
    appendToDisplay(" mod ");
});

const buttonPi = document.getElementById("btnPi");
buttonPi.addEventListener("click", function () {
    appendToDisplay("π");
});

const buttonREPLAY = document.getElementById("btnREPLAY");
buttonREPLAY.addEventListener("click", function () {
    display.value = lastResult;
    focusDisplay();
});

const buttonDeg = document.getElementById("btnDeg");
buttonDeg.addEventListener("click", function () {
    angleMode = "deg";
    focusDisplay();
});

const buttonRad = document.getElementById("btnRad");
buttonRad.addEventListener("click", function () {
    angleMode = "rad";
    focusDisplay();
});

const buttonGrad = document.getElementById("btnGrad");
buttonGrad.addEventListener("click", function () {
    angleMode = "grad";
    focusDisplay();
});

const buttonOpenBracket = document.getElementById("btnOpenbracket");
buttonOpenBracket.addEventListener("click", function () {
    appendToDisplay("(");
});

const buttonCloseBracket = document.getElementById("btnClosebracket");
buttonCloseBracket.addEventListener("click", function () {
    appendToDisplay(")");
});

const buttonAns = document.getElementById("btnAns");
buttonAns.addEventListener("click", function () {
    if (lastResult === "") {
        return;
    }

    const currentValue = display.value.trim();
    if (currentValue === "") {
        display.value = lastResult;
    } else {
        const lastChar = currentValue.slice(-1);
        const operators = ["+", "-", "*", "/", "(", "E"];
        if (operators.includes(lastChar)) {
            display.value = display.value + lastResult;
        } else {
            display.value = display.value + "*" + lastResult;
        }
    }
    focusDisplay();
});

const buttonEq = document.getElementById("btnEq");
buttonEq.addEventListener("click", function () {
    const expression = display.value.trim();
    if (!expression) return;

    try {
        const safeExpression = balanceParentheses(normalizeExpression(expression));
        const result = Function('return ' + safeExpression)();
        if (result === undefined || Number.isNaN(result) || !Number.isFinite(result)) {
            throw new Error();
        }
        lastResult = String(result);
        display.value = lastResult;
    } catch (e) {
        display.value = "Error";
    }
    focusDisplay();
});

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        buttonEq.click();
        return;
    }

    if (key === "Backspace") {
        event.preventDefault();
        display.value = display.value.slice(0, -1);
        focusDisplay();
        return;
    }

    if (key === "Escape") {
        event.preventDefault();
        display.value = "";
        focusDisplay();
        return;
    }

    if (/^[0-9.+\-*/^()Ee!π]$/.test(key)) {
        event.preventDefault();
        appendToDisplay(key);
    }
});

document.addEventListener('click', function (event) {
    if (event.target.tagName !== 'INPUT') {
        focusDisplay();
    }
});

focusDisplay();