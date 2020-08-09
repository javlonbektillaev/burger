//get-obyektagi infoni oqish un xizmat lekn xech narsani ozratirish bermaydi
const return100 = document.querySelector('.header__timer-extra')
// for(i=0; i<100; i++){
function func100() {
    // for(i=0; i<100; i++){

    if (return100.innerHTML < 50) {
        return100.innerHTML = setTimeout(func100, 50)
    } else if ( return100.innerHTML < 100) {
        return100.innerHTML = setTimeout(func100, 25)
    }

}

func100()

const product = {
    plainBurger: {
        name: "GAMBURGER",
        price: 10000,
        amount: 0,
        kcall: 350,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }

    },
    freshBurger: {
        name: "GAMBURGER FRESH",
        price: 20500,
        amount: 0,
        kcall: 450,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }

    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        amount: 0,
        kcall: 700,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }

    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Double Mayonnaise',
        price: 500,
        kcall: 200,
    },
    lettuce: {
        name: 'Lettuce Leaf',
        price: 1500,
        kcall: 15,
    },
    cheese: {
        name: 'Cheese',
        price: 3000,
        kcall: 50,
    },

}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn')
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox')

const receipt = document.querySelector('.receipt')
const receiptWindow = document.querySelector('.receipt__window')
const receiptWindowOut = document.querySelector('.receipt__window-out')
const receiptWindowBtn = document.querySelector('.receipt__window-btn') 

const mainProductInfo = document.querySelectorAll('.main__product-info')
const view = document.querySelector('.view')
const btnClose = document.querySelector('.view__close')
const viewImg = document.querySelector('.view__img')

const addCart = document.querySelector('.addCart')

for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function () {

        plusOrMinus(this)

    })
}
function plusOrMinus(element) {
    // console.log(element);
    // closest-eng yaqin elememtga ulanib beradi(elementni o'zi)
    //  getAttribute (qandaydir br attributga) ulanadi
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        out = parent.querySelector('.main__product-num'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elementData = element.getAttribute('data-symbol');
    if (elementData == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elementData === "-" && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    out.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall


    // console.log(parent, parentId, out, price, elementData, product);
}

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener("click", function () {
        addExtraProduct(this)

    })
}

function addExtraProduct(el) {
    const parent = el.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elementAtr = el.getAttribute('data-extra');

    product[parentId][elementAtr] = el.checked

    if (product[parentId][elementAtr] === true) {
        product[parentId].price += extraProduct[elementAtr].price
        product[parentId].kcall += extraProduct[elementAtr].kcall
    } else {
        product[parentId].kcall -= extraProduct[elementAtr].kcall
    }
    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall

}

addCart.addEventListener("click", function () {

    let totalName = ''
    let totalPrice = 0
    let totalKcall = 0
    for (const key in product) {
        console.log(key, product[key], product[key].amount);
        if (product[key].amount > 0) {
            totalName += `${product[key].name}\n`
            for (const keyId in product[key]) {
                if (product[key][keyId] === true) {
                    console.log(keyId);
                    totalName += keyId + '\n'
                }
            }

            totalName += '\n'


            totalPrice += product[key].Summ
            totalKcall += product[key].Kcall
            console.log(totalName);
        }
    }
    receiptWindowOut.innerHTML = `purchased:\n\n${totalName}Total price: ${totalPrice} sum\nTotal Calories:${totalKcall}calories`
    receipt.style.display = 'flex'
    setTimeout(function () {
        receipt.style.opacity = '1'

    }, 500)
    setTimeout(function () {
        receiptWindow.style.top = '10%'

    }, 600)

    document.body.style.overflow = "hidden"



})

receiptWindowBtn.addEventListener('click', function () {
    location.reload()
})


for (i = 0; i < mainProductInfo.length; i++) {
    mainProductInfo[i].addEventListener('dblclick', function () {
        dblclick(this)

    })
}

btnClose.addEventListener('click', function () {
    view.classList.remove('active')
})


function dblclick(element) {
    const parent = element.closest('.main__product'),
        parentImg = parent.querySelector('.main__product-img'),
        parentSrc = parentImg.getAttribute('src')
    viewImg.setAttribute('src', parentSrc)
    view.classList.add('active')
}
