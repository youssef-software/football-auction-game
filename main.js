// ==========================================
// 1. تعريف الشاشات والأزرار الرئيسية
// ==========================================
const mainMenu = document.getElementById('main-menu');
const auctionScreen = document.getElementById('auction-screen');
const setupGuessScreen = document.getElementById('setup-guess-screen');
const guessScreen = document.getElementById('guess-screen');
const packsScreen = document.getElementById('packs-screen');
const hiddenScreen = document.getElementById('hidden-screen');
const auctionGameScreen = document.getElementById('auction-game-screen');

const btnAuction = document.getElementById('btn-auction');
const btnGuess = document.getElementById('btn-guess');
const btnPacks = document.getElementById('btn-packs');
const btnHidden = document.getElementById('btn-hidden');
const backBtns = document.querySelectorAll('.back-btn');

let activeMode = ""; 

function hideAllScreens() {
    mainMenu.classList.add('hidden');
    auctionScreen.classList.add('hidden');
    setupGuessScreen.classList.add('hidden');
    guessScreen.classList.add('hidden');
    packsScreen.classList.add('hidden');
    hiddenScreen.classList.add('hidden');
    auctionGameScreen.classList.add('hidden'); 
}

// أزرار القائمة الرئيسية
btnAuction.addEventListener('click', () => { hideAllScreens(); auctionScreen.classList.remove('hidden'); });
btnHidden.addEventListener('click', () => openSetupScreen("hidden"));
btnGuess.addEventListener('click', () => openSetupScreen("guess"));

// رسالة الباكات المنبثقة
const customPopup = document.getElementById('custom-popup');
btnPacks.addEventListener('click', () => { 
    customPopup.classList.add('show');
    setTimeout(() => { customPopup.classList.remove('show'); }, 3000); 
});

backBtns.forEach(btn => {
    btn.addEventListener('click', () => { hideAllScreens(); mainMenu.classList.remove('hidden'); });
});

// ==========================================
// 2. إعداد الأسماء والعجلة الدوارة (مشتركة)
// ==========================================
const nameInputsSection = document.getElementById('name-inputs');
const wheelSection = document.getElementById('wheel-section');
const player1Input = document.getElementById('player1-input');
const player2Input = document.getElementById('player2-input');
const btnNextToPlayer2 = document.getElementById('next-to-player2');
const btnStartWheel = document.getElementById('start-wheel-btn');
const wheel = document.getElementById('wheel');
const wheelP1Name = document.getElementById('wheel-p1-name');
const wheelP2Name = document.getElementById('wheel-p2-name');
const wheelResult = document.getElementById('wheel-result');
const btnGoToGame = document.getElementById('go-to-game-btn');

let p1Name = ""; let p2Name = "";
let startingPlayer = ""; let currentTurnName = "";

function openSetupScreen(mode) {
    activeMode = mode;
    hideAllScreens();
    setupGuessScreen.classList.remove('hidden');
    nameInputsSection.classList.remove('hidden');
    wheelSection.classList.add('hidden');
    player1Input.classList.remove('hidden');
    btnNextToPlayer2.classList.remove('hidden');
    player2Input.classList.add('hidden');
    btnStartWheel.classList.add('hidden');
    player1Input.value = ""; player2Input.value = "";
    wheel.style.transform = `rotate(0deg)`;
    wheelResult.classList.add('hidden');
    btnGoToGame.classList.add('hidden');
}

btnNextToPlayer2.addEventListener('click', () => {
    if(player1Input.value.trim() === "") return alert("اكتب اسم اللاعب الأول");
    p1Name = player1Input.value; wheelP1Name.innerText = p1Name;
    player1Input.classList.add('hidden'); btnNextToPlayer2.classList.add('hidden');
    player2Input.classList.remove('hidden'); btnStartWheel.classList.remove('hidden');
});

btnStartWheel.addEventListener('click', () => {
    if(player2Input.value.trim() === "") return alert("اكتب اسم اللاعب الثاني");
    p2Name = player2Input.value; wheelP2Name.innerText = p2Name;
    nameInputsSection.classList.add('hidden'); wheelSection.classList.remove('hidden');

    setTimeout(() => {
        const isPlayer1 = Math.random() < 0.5;
        const totalRotation = (360 * 5) + (isPlayer1 ? 0 : 180) + (Math.floor(Math.random() * 60) - 30);
        wheel.style.transform = `rotate(${totalRotation}deg)`;

        setTimeout(() => {
            startingPlayer = isPlayer1 ? p1Name : p2Name;
            wheelResult.innerText = `البداية مع: ${startingPlayer} 🎉`;
            wheelResult.classList.remove('hidden');
            btnGoToGame.classList.remove('hidden');
        }, 3000);
    }, 50);
});

btnGoToGame.addEventListener('click', () => {
    hideAllScreens();
    currentTurnName = startingPlayer;
    if(activeMode === "guess") { guessScreen.classList.remove('hidden'); initGuessGame(); } 
    else if (activeMode === "hidden") { hiddenScreen.classList.remove('hidden'); initHiddenGame(); }
});

// ==========================================
// 3. قوائم اللاعبين المشتركة وحكم التقييم
// ==========================================
const dbGK = [
  // ==========================================
  // الجزء الأول: أفضل 70 حارس مرمى (قمة التاريخ والحديث)
  // ==========================================
  "جانلويجي بوفون", "إيكر كاسياس", "مانويل نوير", "أوليفر كان", "بيتر شمايكل",
  "دينو زوف", "ليف ياشين", "إدوين فان دير سار", "بيتر تشيك", "تيبو كورتوا",
  "أليسون بيكر", "إيدرسون مويراس", "مارك أندريه تير شتيغن", "يان أوبلاك", "إميليانو مارتينيز",
  "جانلويجي دوناروما", "ديفيد دي خيا", "هوغو لوريس", "كيلور نافاس", "روغيريو سيني",
  "خوسيه لويس تشيلافيرت", "كلاوديو تافاريل", "فابيان بارتيز", "سيب ماير", "غوردون بانكس",
  "والتر زينغا", "فرانشيسكو تولدو", "ينس ليمان", "جيرزي دوديك", "كاسبر شمايكل",
  "سمير هاندانوفيتش", "ياسين بونو", "محمد الشناوي", "عصام الحضري", "أوناي سيمون",
  "ميك ماينان", "دافيد رايا", "جوردان بيكفورد", "غوليلمو فيكاريو", "أليكس ميريت",
  "فويتشيك شتشيسني", "يان سومر", "جريجور كوبيل", "كاستيلز", "روي باتريسيو",
  "أنتوني لوبيز", "غييرمو أوتشوا", "كلاوديو برافو", "سيرخيو روميرو", "فرناندو موسليرا",
  "إدوارد ميندي", "ستيف مونداندا", "ألبان لافونت", "برايس سامبا", "دين هيندرسون",
  "أرون رامسديل", "أنتوني سيلفا", "فريدريك روناو", "أوليفر باومان", "أندريه أونانا",
  "كيبا أريزابالاغا", "لوكاس هراديكي", "ماركو سبورتيلو", "ماتيا بيرين", "ستيفانو سورينتينو",
  "خوان موسو", "أليكس ريميرو", "أندري لونين", "إيفان بروفيديل", "ألبرون أريولا",

  // ==========================================
  // الجزء الثاني: 30 حارس مرمى عادي أو معروف (ضعيف إلى متوسط)
  // ==========================================
  "سيمون مينيوليه", "لوريس كاريوس", "جو هارت", "وين هينيسي", "روبرت سانشيز",
  "نيتو", "إيناكي بينيا", "أدريان", "ماركوس بيتينلي", "سيرجيو آسينخو",
  "أليكساندر نوبل", "سفين أولرايش", "أنتونيو ميرانتي", "تيم كرول", "نيك بوب",
  "بارت فيرباتبروجين", "محمد أبو جبل", "شريف إكرامي", "أحمد الشناوي", "محمود جاد",
  "فاروق بن مصطفى", "رايس مبولحي", "منير المحمدي", "أيمن دحمان", "خالد عيسى",
  "فواز القرني", "معتز ياسين", "علي الخصيف", "عامر شفيع", "بسام الراوي"
];
const dbDEF = [
  // ==========================================
  // الجزء الأول: أفضل 70 مدافع (قلوب دفاع وأظهرة - قمة التاريخ والحديث)
  // ==========================================
  "باولو مالديني", "فرانتس بيكنباور", "سيرخيو راموس", "فرانكو باريزي", "فابيو كانافارو",
  "كارليس بويول", "جون تيري", "نيمانيا فيديتش", "ريو فرديناند", "أليساندرو نيستا",
  "فيرجيل فان دايك", "روبرتو كارلوس", "داني ألفيش", "كافو", "فيليب لام",
  "خافيير زانيتي", "مارسيلو", "ليليان تورام", "رونالد كومان", "دانييل أغيري",
  "باتريس إيفرا", "أشرف حكيمي", "روبنディアس", "أنطونيو روديغر", "تياغو سيلفا",
  "جورجيو كيليني", "ليوناردو بونوتشي", "جيرارد بيكيه", "دانييل كارفاخال", "ألكسندر أرنولد",
  "ألفونسو ديفيز", "أﻧﺪﺭﻳﺎ ﺑﺎﺭﺯﺍﻟﻲ", "كاليدو كوليبالي", "ماركينيوس", "إيدير ميليتاو",
  "ويليام ساليبا", "غابرييل ماغالهايس", "جول كوندي", "رونالد أراوخو", "تيو هيرنانديز",
  "كايل ووكر", "أندرو روبرتسون", "دافيد ألابا", "رافاييل فاران", "ميسون هوملز",
  "دييغو غودين", "سامويل أومتيتي", "خوسيه خيمينيز", "سامي خضيرة", "يان أوبلاك",
  "ماتيس دي ليخت", "ياپ ستام", "سول كامبل", "جيمي كاراغر", "ستيفان دي فري",
  "أيمن عبد النور", "مهدي بن عطية", "نايف أكرد", "علي معلول", "أحمد حجازي",
  "وائل جمعة", "إبراهيم سعيد", "هاني رمزي", "بدر بانون", "محمد عبد المنعم",
  "لوك شو", "ستانيسلاف لوبوتبكا", "كييران تريبير", "يوسكو غفارديول", "بنجامين بافارد",

  // ==========================================
  // الجزء الثاني: 30 مدافع عادي أو معروف (ضعيف إلى متوسط)
  // ==========================================
  "إريك داير", "هاري ماغواير", "شكودران موستافي", "ديفيد لويز", "ديان لوفرين",
  "فيل جونز", "كورت زوما", "ناثان أكي", "ييري مينا", "خيسوس فاييخو",
  "كليمنت لينغليت", "تاكيهيرو تومياسو", "إيميريك لابورت", "مارك باارترا", "سعيد أويستاس",
  "تيلو كيرير", "دينيس أوجوجو", "هيكتور بيليرين", "نيكولاس أوتاميندي", "جابرييل باوليستا",
  "سام برودفوت", "أندرياس كريستنسن", "ماتيا دي شيليو", "سيدريك سواريس", "تيموثي كاستاني",
  "آرون وان بيساكا", "سيرجينو ديست", "رومان سايس", "محمود علاء", "علي جبر"
];
const dbMID = [
  // ==========================================
  // الجزء الأول: أفضل 70 لاعب وسط (صناع لعب، ارتكاز، ومحاور)
  // ==========================================
  "زين الدين زيدان", "تشافي هيرنانديز", "أندريس إنييستا", "لوكا مودريتش", "أندريا بيرلو",
  "توني كروس", "بول سكولز", "ستيفن جيرارد", "فرانك لامبارد", "كاكا",
  "رود خوليت", "لوتار ماتيوس", "سيرجيو بوسكيتس", "باتريك فييرا", "روي كين",
  "رودري", "كيفين دي بروين", "جود بيلينغهام", "نغولو كانتي", "مسعود أوزيل",
  "سيسك فابريغاس", "ديفيد بيكهام", "ميشيل بلاتيني", "سقراط", "زيكو",
  "غايتانو شيريا", "دييغو سيميوني", "كاسميرو", "كلاوديو ماكيليلي", "خافيير زانيتي",
  "ميكايل بالاك", "باستيان شفاينشتايغر", "إدغار دافيدز", "جينارو غاتوزو", "تشابي ألونسو",
  "ويسلي سنايدر", "خوان رومان ريكلمي", "ديكو", "برونو فيرنانديز", "كلاوديو ماركيزيو",
  "فرينكي دي يونغ", "مارتين أوديجارد", "فيديريكو فالفيردي", "جمال موسيالا", "فلوريان فيرتز",
  "أوريليين تشواميني", "إدواردو كامافينغا", "ألكسيس ماك أليستر", "ديكلان رايس", "بيوتر زيلينسكي",
  "إلكاي غوندوغان", "ماركو فيراتي", "تياغو ألكانتارا", "كريستيان إريكسن", "سيرجي ميلينكوفيتش سافيتش",
  "ميراليم بيانيتش", "آرتور فيدال", "إسماعيل بن ناصر", "توماس بارتي", "فريد",
  "خاميس رودريغيز", "إيسكو", "يوري تيليمانس", "جورجينيو", "مارسيلو بروزوفيتش",
  "ماتيو كوفاتشيتش", "مؤمن زكريا", "طارق حامد", "حسام غالي", "محمد النني",

  // ==========================================
  // الجزء الثاني: 30 لاعب وسط عادي أو معروف (ضعيف إلى متوسط)
  // ==========================================
  "سكوت ماكتوميناي", "كونور غالاغير", "جيسي لينغارد", "أليكس أكسليد تشامبرلين", "هاري وينكس",
  "تيموي باكايوكو", "أندريه غوميز", "داني سيبايوس", "ديلي ألي", "ستيفن نزونزي",
  "مورغان شنايدرلين", "دينيس زكريا", "روبن نيفيز", "ويليام كارفاليو", "يوسف فوفانا",
  "جيوفاني لو سيلسو", "ويستون ميكيني", "توم كليفرلي", "جاك ويلشير", "سعيد بن رحمة",
  "أندريه أندريه", "جون أوبراين", "مارك كاسادو", "أوركان كوكجو", "أليكس كرال",
  "شيموس كولمان", "لوكاس توريرا", "مكسيم لوبيز", "أمادو أونانا", "ماركوس يورينتي"
];
const dbFWD = [
  // ==========================================
  // الجزء الأول: أفضل 70 مهاجم (رأس حربة وجناحين - قمة التاريخ والحديث)
  // ==========================================
  "ليونيل ميسي", "كريستيانو رونالدو", "دييغو مارادونا", "بيليه", "رونالدو الظاهرة",
  "رونالدينيو", "يوهان كرويف", "تييري هنري", "ماركو فان باستن", "جيرد مولر",
  "كريم بنزيما", "روبرت ليفاندوفسكي", "إرلينغ هالاند", "كيليان إمبابي", "نيمار جونيور",
  "محمد صلاح", "واين روني", "زلاتان إبراهيموفيتش", "لويس سواريز", "صامويل إيتو",
  "ديدييه دروغبا", "رود فان نيستلروي", "أندري شيفتشينكو", "غابرييل باتيستوتا", "روماريو",
  "ريفالدو", "جورج وياه", "كارل هاينز رومانيغه", "راؤول غونزاليس", "دافيد فيا",
  "فرينك بوشكاش", "أوزيبيو", "غارينشا", "روبين فان بيرسي", "أويريو أريين روبن",
  "فرانك ريبيري", "سيرخيو أجويرو", "هاري كين", "فينيسيوس جونيور", "ساديو ماني",
  "أنطوان غريزمان", "إدين هازارد", "غاريث بيل", "كارلوس تيفيز", "أليساندروデル بييرو",
  "فرانسيسكو توتي", "مايكل أوان", "دنماركي ميكائيل لاودروب", "روبيرتو باجيو", "برانيسلاف بركامب",
  "جونزالو هيغواين", "راداميل فالكاو", "إدينسون كافاني", "فيكتور أوسيمين", "خوليان ألفاريز",
  "رودريغو", "لافوتارو مارتينيز", "بوكايو ساكا", "عثمان ديمبيلي", "سون هيونغ مين",
  "رياض محرز", "خفيتشا كفاراتسخيليا", "لويس فيغو", "باولو ديبالا", "ألكسيس سانشيز",
  "دييغو فورلان", "هيرنان كريسفو", "كلينسمان", "دانييل أورتيغا", "كريستيان فييري",

  // ==========================================
  // الجزء الثاني: 30 مهاجم عادي / معروف ولكن ليس من الصف الأول (ضعيف إلى متوسط)
  // ==========================================
  "ماريو بالوتيلي", "نيكولاس جاكسون", "شيرو إيموبيلي", "ستيفان إيل شاراوي", "تيمو فيرنر",
  "داروين نونيز", "ريتشارليسون", "ويلفريد زاها", "ميشي باتشوايي", "سيباستيان هالير",
  "ألفارو موراتا", "أنتوني", "أنطوني مارسيال", "ممفيس ديباي", "كريستيان بينتيكي",
  "سالم الدوسري", "سيردار أزمون", "ويلفريد بوني", "أوليفييه جيرو", "ووت فيغورست",
  "داني ويلبيك", "لوك دي يونغ", "خوسيلو", "إيريك מקسيم تشوبو-موتينغ", "سيردار دورسون",
  "أليكساندر لاكازيت", "فينسنت أبوبكر", "أندي كارول", "سيرجي غنابري", "إيغالو"
];

const topStars = [
  // ==========================================
  // أفضل 10 حراس مرمى في التاريخ
  // ==========================================
  "جانلويجي بوفون",
  "ليف ياشين",
  "إيكر كاسياس",
  "مانويل نوير",
  "أوليفر كان",
  "تيبو كورتوا",
  "بيتر شمايكل",
  "إدوين فان دير سار",
  "بيتر تشيك",
  "كاسبر شمايكل",

  // ==========================================
  // أفضل 20 مدافع في التاريخ
  // ==========================================
  "باولو مالديني",
  "فرانتس بيكنباور",
  "سيرخيو راموس",
  "فرانكو باريزي",
  "فابيو كانافارو",
  "كارليس بويول",
  "داني ألفيش",
  "روبرتو كارلوس",
  "أليساندرو نيستا",
  "جون تيري",
  "نيمانيا فيديتش",
  "ريو فرديناند",
  "كافو",
  "مارسيلو",
  "فيليب لام",
  "خافيير زانيتي",
  "ليليان تورام",
  "رونالد كومان",
  "فيرجيل فان دايك",
  "دانييل كارفاخال",

  // ==========================================
  // أفضل 20 لاعب وسط في التاريخ
  // ==========================================
  "زين الدين زيدان",
  "تشافي هيرنانديز",
  "أندريس إنييستا",
  "لوكا مودريتش",
  "أندريا بيرلو",
  "توني كروس",
  "لوتار ماتيوس",
  "رود خوليت",
  "ميشيل بلاتيني",
  "زيكو",
  "سقراط",
  "بول سكولز",
  "ستيفن جيرارد",
  "فرانك لامبارد",
  "كاكا",
  "كيفين دي بروين",
  "باتريك فييرا",
  "روي كين",
  "ديفيد بيكهام",
  "مسعود أوزيل",

  // ==========================================
  // أفضل 20 مهاجم في التاريخ
  // ==========================================
  "ليونيل ميسي",
  "كريستيانو رونالدو",
  "بيليه",
  "دييغو مارادونا",
  "رونالدو الظاهرة",
  "رونالدينيو",
  "يوهان كرويف",
  "فرينك بوشكاش",
  "أوزيبيو",
  "غارينشا",
  "تييري هنري",
  "ماركو فان باستن",
  "جيرد مولر",
  "كيليان إمبابي",
  "محمد صلاح",
  "روبرت ليفاندوفسكي",
  "زلاتان إبراهيموفيتش",
  "لويس سواريز",
  "صامويل إيتو",
  "نيمار جونيور"
];

function simulateMatchResult(squad1, squad2) {
    const calculatePower = (squad) => {
        let power = 0;
        ['GK','DEF','MID','FWD'].forEach(pos => {
            squad[pos].forEach(player => {
                power += Math.floor(Math.random() * 4) + 6;
                if(topStars.includes(player)) power += 15;
            });
        });
        return power;
    };

    const power1 = calculatePower(squad1); const power2 = calculatePower(squad2);
    const powerDiff = Math.abs(power1 - power2);
    let p1Goals = 0; let p2Goals = 0;
    
    if (power1 > power2) {
        p1Goals = Math.floor(Math.random() * 2) + 2; p2Goals = Math.floor(Math.random() * 2);
        if (powerDiff > 25) p1Goals += Math.floor(Math.random() * 2) + 2;
    } else if (power2 > power1) {
        p2Goals = Math.floor(Math.random() * 2) + 2; p1Goals = Math.floor(Math.random() * 2);
        if (powerDiff > 25) p2Goals += Math.floor(Math.random() * 2) + 2;
    } else {
        p1Goals = Math.floor(Math.random() * 3) + 1; p2Goals = p1Goals;
    }
    return { p1Goals, p2Goals };
}

// ==========================================
// 4. طور "من اللاعب"
// ==========================================
let p1Score = 0; let p2Score = 0;
const cardsContainer = document.getElementById('cards-container');
const allPowerCards = ["سؤال مضمون", "زيادة سؤال", "تغيير اللاعب والاعادة", "زيادة سؤالين", "أول حرف من اللاعب", "أول حرفين من اللاعب", "معرفة فريق اللاعب", "معرفة منتخب اللاعب"];
let p1Cards = []; let p2Cards = [];

const guessPlayers = [
    // أساطير الكرة الذهبية والتاريخ (قديم وحديث)
    "ليونيل ميسي", "كريستيانو رونالدو", "دييغو مارادونا", "بيليه", "زين الدين زيدان",
    "رونالدو الظاهرة", "رونالدينيو", "يوهان كرويف", "باولو مالديني", "تشافي هيرنانديز",
    "أندريس إنييستا", "فرانتس بيكنباور", "جيرد مولر", "كارل هاينز رومانيجي ", "رومانيجي ",
    "بيرلو ", "ماركو فان باستن", "رود خوليت", "فرانك ريكارد", "لوتار ماتيوس",
    "توتي  ", "ريفالدو", "لويس فيجو", "مايكل أوين", "بافيل نيدفيد",
    "أندري شيفتشينكو", "فابيو كانافارو", "كاكا", "باتو بتاع ميلان", " جاريث بيل ",
    "روني ", "ليف ياشين", "كارل هاينز رومانيجي", " نوير", " كارل هيانز رومانيجي ",

    // نجوم الجيل الحالي والسوشيال ميديا
    "محمد صلاح", "نيمار جونيور", "كيليان مبابي", "إيرلينغ هالاند", "فينيسيوس جونيور",
    "جود بيلينجهام", "كيفين دي بروين", "روبرت ليفاندوفسكي", "لوكا مودريتش", "كريم بنزيما",
    "سون هيونغ مين", "هاري كين", "بوكايو ساكا", "فيل فودين", "جمال موسيالا",
    "فلوريان فيرتز", "أنطوان جريزمان", "رودري", "ديكلان رايس", "كول بالمر",
    "لامين يامال", "بيدري", "جافي", "إدواردو كامافينجا", "أوريلين تشواميني",
    "رافاييل لياو", "خفيتشا كفاراتسخيليا", "فيكتور أوسيمين", "لاوتارو مارتينيز", "جوليان ألفاريز",

    // أساطير وأيقونات لا تنسى (هجوم ووسط)
    "تييري هنري", "اغويرو  ", "باتريك فييرا", "ستيفن جيرارد", "فرانك لامبارد",
    "بول سكولز", "واين روني", "ريان غيغز", "هاري كين", "راشفورد ",
    "زلاتان إبراهيموفيتش", "أليساندرو ديل بييرو", "فرانشيسكو توتي", "أندريا بيرلو", " كومباني",
    "ماركو فان باستن", "فيليبو إنزاغي", "لويس فيغو ", "جابرييل باتيستوتا", " موراتا",
    " كيميتش ", "خوليت", "رومانيجي", "زيدان", "كافو",
    "روبرتو كارلوس", "ديفيد بيكهام", " ريبيري", "أرين روبن", "روبن فان بيرسي",
    "رود فان نيستلروي", "لويس سواريز", "إدينسون كافاني", "دييغو فورلان", "غاريث بيل",

    // أساطير ونجوم الدفاع
    "سيرجيو راموس", "جيرارد بيكيه", "كارليس بويول", "جون تيري", "ريو فرديناند",
    " مالديني", "أليساندرو نيستا", "جورجيو كيلليني", "ليوناردو بونوتشي", "فيرجيل فان دايك",
    "روبن دياز", "ماركينيوس", "تياجو سيلفا", "بيبي", "خافيير زانيتي",
    "داني ألفيس", "مارسيلو", "أشرف حكيمي", "ترنت ألكساندر أرنولد", "كايل ووكر",
    "ألفونسو ديفيز", "أشلي كول", "فيليب لام", "بيكنباور ", " سالم الدوسري",
    " ماركوس تورام", " جونزالو راموس", " بونو", "كنيلغسي كومان ", "جواو فيلكس ",

    // حراس مرمى أسطوريين وحاليين
    "جانلويجي بوفون", "إيكر كاسياس", "مانويل نوير", "أوليفر كان", "بيتر شمايكل",
    "إدوين فان در سار", "بيتر تشيك", "ديدا", "فرمينيو ", "أليسون بيكر",
    "إيدرسون", "تيبو كورتوا", "يان أوبلاك", "مارك أندريه تير شتيجن", "إيميليانو مارتينيز",
    "ياسين بونو", "هوجو لوريس", "جيانلويجي دوناروما", " ساديو ماني", "كيلور نافاس",

    // نجوم عالميين من دوريات ومنتخبات مختلفة
    "رياض محرز", "حكيم زياش", "ساديو ماني", "بيير إيميريك أوباميانغ", "ديدييه دروجبا",
    "صامويل إيتو", "راؤول ", "كيلور نافاس", "كوندي", "كوبارسي",
    "خاميس رودريغيز", "لويس دياز ", "أرتورو فيدال", "دييغو كوستا ", "أنخيل دي ماريا",
    "جونزالو هيجواين", "كاسيميرو", "تشابي ألونسو", " بوسكيتس", "برناندو سيلفا",
    "موراتا ", "فرناندو توريس", " رومانيجي", "ماركو رويس", "توماس مولر",
    "باستيان شفاينشتايجر", "توني كروس", "مسعود أوزيل", "إيلكاي جوندوجان", "ليروي ساني",
    "سيرج جنابري", "برونو فيرنانديز", "برناردو سيلفا", "جواو كانسيلو", "روبن نيفيز",
    "جواو فيليكس", "ديوجو جوتا", "كريم بنزيما", "مارتن أوديغارد", "ايسكو ",
    
    // نجوم إضافية لامعة (لإكمال الـ 300 بأسماء قوية ومألوفة)
    "إدواردو كامافينجا", "داروين نونيز", "كودي جاكبو", "انتوني  ", "فرينكي دي يونج",
    "ماتيس دي ليخت", "جيريمي فريمبونج", "ديل علي ", "كولو مواني", "ماركوس تورام",
    "أوليفييه جيرو", "عثمان ديمبيلي", "كينغسلي كومان", "نيكولو باريلا", "فيديريكو كييزا",
    "ساندرو تونالي", " ماردونا", "جيوكريس ", "جوسكو جفارديول", "ماتيو كوفاسيتش",
    "مارسيلو ", " فلاهوفيتش", "بافلوفيتش ", " لايمر ", "دومينيك سوبوسلاي",
    "أردا جولر", "مايكل اوليسي  ", "مايكل اوليسي ", "كيفين ديبروين ", "جاك جريليش",
    "رحيم ستيرلينج", "ماركوس راشفورد", "ميسون ماونت", "ريس جيمس", " ديفيد رايا",
    "ديفيد رايا", "جوردان بيكفورد", "جون ستونز", "هاري ماجواير", "لوك شاو",
    "كوكوريا ", "ماتياس ديليخت ", "إيميريك لابورت", "فيران توريس", "داني أولمو",
    "نيكو ويليامز", " موراتا", "أليكس جريمالدو", "مارك كوكوريلا", " كول بالمر",
    "كاسيميرو", "فابينيو", "ريو فرناند", "أنتوني", "رافينيا",
    "رودريجو", "ريتشارليسون", "جابرييل جيسوس", "روبرتو فيرمينو", "دوغلاس كوستا",
    "أوسكار", "سباستيان شفانستيجر", "فيرناندينيو", "جيرارد بيكيه", "إيفان راكيتيتش",
    "اما عاشور ", "تريزيجه ", " هيونغ مين سون", "أليكسيس ماك أليستر", "إنزو فرنانديز",
    "كريستيان روميرو", " توماس مولر", "ليونيل ميسي ", "رودريجو دي باول", "ماركينيوس ",
    "ماريو جوتزه", "كوبل ", "بالينيا ", "كاي هافيرتز", " فيرتز",
    "ماتس هوملز", "جيروم بواتينغ", "ليون جوريتسكا", "جوشوا كيميتش", "ألفارو موراتا",
    "دييغو كوستا", "محمد هاني", "محمد صلاح", "ماركوس راشفورد", "كيليان امبابي ",
    "روميلو لوكاكو", "إيدين هازارد", "تيبو كورتوا", "فينسنت كومباني", "ايزاك ",
    " اوليفر كان", "عثمان ديمبيلي", "الحضري ", "شوبير ", "اتكيتي ",
    "جيريمي دوكو", " مارتين اوديجارد", " ديفيد رايا ", "مانويل نوير ", "الشناوي",
    "ماركو فان باستن", "داني اولمو ", "ألكسندر إيزاك", "فيكتو اوسمين ", "لامين يمال ",
    "فيلب لام ", "توماس مولر", "جرانيت تشاكا", "روبن دياز ", "مانويل نوير "
];
let availableGuessPlayers = [...guessPlayers];

function shuffleAndDealCards() {
    let shuffled = [...allPowerCards].sort(() => 0.5 - Math.random()); p1Cards = shuffled.slice(0, 3);
    shuffled = [...allPowerCards].sort(() => 0.5 - Math.random()); p2Cards = shuffled.slice(0, 3);
}

function renderCards() {
    cardsContainer.innerHTML = '';
    const currentCards = (currentTurnName === p1Name) ? p1Cards : p2Cards;
    currentCards.forEach((cardName, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'power-card'; cardEl.innerText = cardName;
        cardEl.onclick = () => {
            cardEl.classList.add('used');
            setTimeout(() => {
                if (currentTurnName === p1Name) p1Cards.splice(index, 1); else p2Cards.splice(index, 1);
                if(cardName === "تغيير اللاعب والاعادة") changePlayerOnly(); else renderCards();
            }, 300);
        };
        cardsContainer.appendChild(cardEl);
    });
}

function changePlayerOnly() {
    if (availableGuessPlayers.length === 0) availableGuessPlayers = [...guessPlayers];
    const randomIndex = Math.floor(Math.random() * availableGuessPlayers.length);
    const randomPlayer = availableGuessPlayers[randomIndex];
    availableGuessPlayers.splice(randomIndex, 1);
    document.getElementById('random-player-name').innerText = randomPlayer;
    renderCards();
}

function initGuessGame() {
    p1Score = 0; p2Score = 0; availableGuessPlayers = [...guessPlayers];
    document.getElementById('btn-success').classList.remove('hidden'); document.getElementById('btn-fail').classList.remove('hidden');
    shuffleAndDealCards(); updateGuessUI();
}

function updateGuessUI() {
    document.getElementById('player1-score').innerText = `${p1Name}: ${p1Score}`;
    document.getElementById('player2-score').innerText = `${p2Name}: ${p2Score}`;
    document.getElementById('turn-indicator').innerText = `دور: ${currentTurnName}`;
    if (availableGuessPlayers.length === 0) availableGuessPlayers = [...guessPlayers];
    const randomIndex = Math.floor(Math.random() * availableGuessPlayers.length);
    const randomPlayer = availableGuessPlayers[randomIndex];
    availableGuessPlayers.splice(randomIndex, 1);
    document.getElementById('random-player-name').innerText = randomPlayer;
    renderCards();
}

function switchGuessTurn() { currentTurnName = (currentTurnName === p1Name) ? p2Name : p1Name; updateGuessUI(); }

document.getElementById('btn-success').addEventListener('click', () => {
    if(activeMode !== "guess") return;
    if(currentTurnName === p1Name) p1Score++; else p2Score++;
    if(p1Score === 3 || p2Score === 3) {
        document.getElementById('random-player-name').innerText = `🎉 فاز ${currentTurnName}! 🎉`;
        document.getElementById('player1-score').innerText = `${p1Name}: ${p1Score}`;
        document.getElementById('player2-score').innerText = `${p2Name}: ${p2Score}`;
        document.getElementById('btn-success').classList.add('hidden'); document.getElementById('btn-fail').classList.add('hidden');
        cardsContainer.innerHTML = ''; document.getElementById('turn-indicator').innerText = "انتهت اللعبة";
    } else switchGuessTurn();
});
document.getElementById('btn-fail').addEventListener('click', () => { if(activeMode === "guess") switchGuessTurn(); });

// ==========================================
// 5. طور "اللاعب الخفي"
// ==========================================
const formationLimits = { GK: 1, DEF: 2, MID: 2, FWD: 3 };
let p1Squad = { GK: [], DEF: [], MID: [], FWD: [] }; let p2Squad = { GK: [], DEF: [], MID: [], FWD: [] };
let currentNeededPos = ""; let currentVisiblePlayer = ""; let currentHiddenPlayer = "";
const visibleCard = document.getElementById('visible-card'); const hiddenCard = document.getElementById('hidden-card');
const visibleName = document.getElementById('visible-name'); const hiddenName = document.getElementById('hidden-name');
const positionText = document.getElementById('position-needed-text');

function initHiddenGame() {
    p1Squad = { GK: [], DEF: [], MID: [], FWD: [] }; p2Squad = { GK: [], DEF: [], MID: [], FWD: [] };
    document.getElementById('h-p1-name').innerText = p1Name; document.getElementById('h-p2-name').innerText = p2Name;
    nextHiddenTurn();
}

function getMissingPositions(squad) {
    let missing = [];
    if (squad.GK.length < formationLimits.GK) missing.push("GK");
    if (squad.DEF.length < formationLimits.DEF) missing.push("DEF");
    if (squad.MID.length < formationLimits.MID) missing.push("MID");
    if (squad.FWD.length < formationLimits.FWD) missing.push("FWD");
    return missing;
}

function renderSquads() {
    const renderList = (squad, elementId) => {
        const el = document.getElementById(elementId); el.innerHTML = "";
        const allPlayers = [...squad.GK.map(p=>`حارس: ${p}`), ...squad.DEF.map(p=>`دفاع: ${p}`), ...squad.MID.map(p=>`وسط: ${p}`), ...squad.FWD.map(p=>`هجوم: ${p}`)];
        allPlayers.forEach(p => { const li = document.createElement('li'); li.innerText = p; el.appendChild(li); });
    };
    renderList(p1Squad, 'h-p1-squad'); renderList(p2Squad, 'h-p2-squad');
}

function nextHiddenTurn() {
    renderSquads();
    document.getElementById('hidden-turn-indicator').innerText = `دور: ${currentTurnName}`;
    hiddenCard.className = "choice-card mystery"; hiddenName.innerText = "؟";
    visibleCard.style.display = "flex"; hiddenCard.style.display = "flex";
    
    let currentSquad = (currentTurnName === p1Name) ? p1Squad : p2Squad;
    let missing = getMissingPositions(currentSquad);
    
    if (missing.length === 0) {
        const result = simulateMatchResult(p1Squad, p2Squad);
        let finalMessage = "";
        if (result.p1Goals > result.p2Goals) finalMessage = `🏆 فاز ${p1Name} بنتيجة ${result.p1Goals} - ${result.p2Goals}`;
        else if (result.p2Goals > result.p1Goals) finalMessage = `🏆 فاز ${p2Name} بنتيجة ${result.p2Goals} - ${result.p1Goals}`;
        else finalMessage = `🤝 تعادل الفريقان بنتيجة ${result.p1Goals} - ${result.p2Goals}`;
        document.getElementById('hidden-turn-indicator').innerText = finalMessage;
        positionText.innerText = "انتهت اللعبة!";
        visibleCard.style.display = "none"; hiddenCard.style.display = "none";
        renderSquads(); return;
    }

    currentNeededPos = missing[Math.floor(Math.random() * missing.length)];
    let dbToUse = []; let posNameAR = "";
    if (currentNeededPos === "GK") { dbToUse = dbGK; posNameAR = "حارس مرمى"; }
    if (currentNeededPos === "DEF") { dbToUse = dbDEF; posNameAR = "مدافع"; }
    if (currentNeededPos === "MID") { dbToUse = dbMID; posNameAR = "خط وسط"; }
    if (currentNeededPos === "FWD") { dbToUse = dbFWD; posNameAR = "مهاجم"; }

    positionText.innerText = `مطلوب: ${posNameAR}`;
    let shuffledDb = [...dbToUse].sort(() => 0.5 - Math.random());
    currentVisiblePlayer = shuffledDb[0]; currentHiddenPlayer = shuffledDb[1];
    visibleName.innerText = currentVisiblePlayer;
}

visibleCard.onclick = () => { addPlayerToSquad(currentVisiblePlayer); };
hiddenCard.onclick = () => {
    hiddenCard.classList.remove('mystery'); hiddenCard.classList.add('revealed'); hiddenName.innerText = currentHiddenPlayer;
    setTimeout(() => { addPlayerToSquad(currentHiddenPlayer); }, 1000);
};

function addPlayerToSquad(player) {
    if (currentTurnName === p1Name) { p1Squad[currentNeededPos].push(player); currentTurnName = p2Name; } 
    else { p2Squad[currentNeededPos].push(player); currentTurnName = p1Name; }
    nextHiddenTurn();
}

// ==========================================
// 6. طور المزاد (المخفي والعلني بالكروت السحرية)
// ==========================================
const passPhoneOverlay = document.getElementById('pass-phone-overlay');
let aucP1Name = ""; let aucP2Name = "";
let aucP1Budget = 100; let aucP2Budget = 100;
let aucPlayerCount = 5; let aucType = "public";

let auctionPositions = []; let currentAucIndex = 0;
let currentAucRevealedPlayer = ""; let currentAucPosition = "";
let aucSquadP1 = { GK: [], DEF: [], MID: [], FWD: [] }; let aucSquadP2 = { GK: [], DEF: [], MID: [], FWD: [] };

// متغيرات كروت المزاد
const allAucCards = ["+30 مليون", "+40 مليون", "+50 مليون", "خصم 50%", "ضرائب -70M", "منع المزايدة", "سرقة اللاعب"];
let aucP1Cards = []; let aucP2Cards = [];
let activeAucEffects = { p1Discount: false, p2Discount: false, p1Guarantee: false, p2Guarantee: false, p1Steal: false, p2Steal: false };
const aucCardsContainer = document.getElementById('auc-cards-container');
let hiddenAuctionTurn = 1;

document.querySelectorAll('.player-count').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.player-count').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active'); aucPlayerCount = parseInt(e.target.getAttribute('data-value'));
    });
});

document.querySelectorAll('.auction-type').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.auction-type').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active'); aucType = e.target.getAttribute('data-value');
    });
});

document.getElementById('start-auction-action').addEventListener('click', () => {
    aucP1Name = document.getElementById('auc-p1-input').value.trim();
    aucP2Name = document.getElementById('auc-p2-input').value.trim();
    if(aucP1Name === "" || aucP2Name === "") return alert("يرجى إدخال أسماء اللاعبين!");

    if (aucPlayerCount === 11) { aucP1Budget = 1000; aucP2Budget = 1000; } 
    else { aucP1Budget = 100; aucP2Budget = 100; }
    
    aucSquadP1 = { GK: [], DEF: [], MID: [], FWD: [] }; aucSquadP2 = { GK: [], DEF: [], MID: [], FWD: [] };
    currentAucIndex = 0;
    
    // توزيع كروت المزاد
    let shuffled = [...allAucCards].sort(() => 0.5 - Math.random()); aucP1Cards = shuffled.slice(0, 3);
    shuffled = [...allAucCards].sort(() => 0.5 - Math.random()); aucP2Cards = shuffled.slice(0, 3);

    if(aucPlayerCount === 5) auctionPositions = ["GK", "DEF", "MID", "MID", "FWD"];
    else auctionPositions = ["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD", "FWD"];

    hideAllScreens(); auctionGameScreen.classList.remove('hidden');
    updateAuctionUI(); nextAuctionTurn();
});

function renderAucCards(currentPlayerName, playerCardsArray) {
    aucCardsContainer.innerHTML = '';
    aucCardsContainer.classList.remove('hidden');

    playerCardsArray.forEach((cardName, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'power-card'; cardEl.innerText = cardName;
        
        cardEl.onclick = () => {
            cardEl.classList.add('used');
            const isP1 = (currentPlayerName === aucP1Name);
            
            setTimeout(() => {
                if (cardName.includes("+")) {
                    const amount = parseInt(cardName.replace(/\D/g, ''));
                    if(isP1) aucP1Budget += amount; else aucP2Budget += amount;
                    alert(`تم إضافة ${amount}M لميزانيتك!`);
                } 
                else if (cardName === "ضرائب -70M") {
                    if(isP1) aucP2Budget = Math.max(0, aucP2Budget - 70); else aucP1Budget = Math.max(0, aucP1Budget - 70);
                    alert("تم سحب 70M من ميزانية خصمك!");
                }
                else if (cardName === "خصم 50%") {
                    if(isP1) activeAucEffects.p1Discount = true; else activeAucEffects.p2Discount = true;
                    alert("تفعيل الخصم! في حال فوزك ستدفع نصف مزايدتك فقط.");
                }
                else if (cardName === "منع المزايدة") {
                    if(isP1) { aucP2Budget = Math.max(0, aucP2Budget - 10); activeAucEffects.p1Guarantee = true; }
                    else { aucP1Budget = Math.max(0, aucP1Budget - 10); activeAucEffects.p2Guarantee = true; }
                    alert("تم سحب 10M من خصمك، ومزايدتك ستفوز إجبارياً!");
                }
                else if (cardName === "سرقة اللاعب") {
                    if(isP1) activeAucEffects.p1Steal = true; else activeAucEffects.p2Steal = true;
                    alert("فخ السرقة مفعل! ستحصل على اللاعب بسعرك حتى لو فاز خصمك.");
                }

                if (isP1) aucP1Cards.splice(index, 1); else aucP2Cards.splice(index, 1);
                updateAuctionUI();
                renderAucCards(currentPlayerName, isP1 ? aucP1Cards : aucP2Cards);
            }, 300);
        };
        aucCardsContainer.appendChild(cardEl);
    });
}

function updateAuctionUI() {
    document.getElementById('auc-p1-name-display').innerText = aucP1Name;
    document.getElementById('auc-p2-name-display').innerText = aucP2Name;
    document.getElementById('auc-p1-budget').innerText = aucP1Budget + "M";
    document.getElementById('auc-p2-budget').innerText = aucP2Budget + "M";
    document.getElementById('label-bid-p1').innerText = `مزايدة ${aucP1Name}`;
    document.getElementById('label-bid-p2').innerText = `مزايدة ${aucP2Name}`;
}

function nextAuctionTurn() {
    if (currentAucIndex >= auctionPositions.length) { endAuction(); return; }

    document.getElementById('auc-bid-p1').value = ""; document.getElementById('auc-bid-p2').value = "";
    document.getElementById('bidding-area').classList.remove('hidden');
    
    currentAucPosition = auctionPositions[currentAucIndex];
    let dbToUse = []; let posNameAR = "";
    
    if (currentAucPosition === "GK") { dbToUse = dbGK; posNameAR = "حارس مرمى"; }
    if (currentAucPosition === "DEF") { dbToUse = dbDEF; posNameAR = "مدافع"; }
    if (currentAucPosition === "MID") { dbToUse = dbMID; posNameAR = "خط وسط"; }
    if (currentAucPosition === "FWD") { dbToUse = dbFWD; posNameAR = "مهاجم"; }

    document.getElementById('auc-position-text').innerText = `المركز: ${posNameAR} (${currentAucIndex + 1}/${auctionPositions.length})`;
    const shuffledDb = [...dbToUse].sort(() => 0.5 - Math.random());
    currentAucRevealedPlayer = shuffledDb[0];
    document.getElementById('auc-player-name').innerText = currentAucRevealedPlayer;

    if (aucType === "hidden") {
        document.getElementById('bid-col-2').classList.add('hidden');
        document.getElementById('auc-bid-p1').type = "password"; document.getElementById('auc-bid-p2').type = "password";
        hiddenAuctionTurn = 1;
        document.getElementById('btn-confirm-bid').innerText = `تأكيد وتمرير الهاتف لـ ${aucP2Name}`;
        renderAucCards(aucP1Name, aucP1Cards);
    } else {
        document.getElementById('bid-col-2').classList.remove('hidden');
        document.getElementById('auc-bid-p1').type = "number"; document.getElementById('auc-bid-p2').type = "number";
        document.getElementById('btn-confirm-bid').innerText = "اعتماد المزايدة للطرفين";
        aucCardsContainer.classList.add('hidden');
    }
}

document.getElementById('btn-confirm-bid').addEventListener('click', () => {
    const inputP1 = document.getElementById('auc-bid-p1'); const inputP2 = document.getElementById('auc-bid-p2');

    if (aucType === "hidden" && hiddenAuctionTurn === 1) {
        if(!validateSingleBid(inputP1.value, aucP1Budget)) return;
        document.getElementById('pass-phone-text').innerText = `أعطِ الهاتف لـ ${aucP2Name}`;
        passPhoneOverlay.classList.remove('hidden');
        return;
    }

    const bid1 = parseInt(inputP1.value); const bid2 = parseInt(inputP2.value);
    if (!validateSingleBid(inputP1.value, aucP1Budget) || !validateSingleBid(inputP2.value, aucP2Budget)) return;

    if (bid1 === bid2) {
        alert("🚨 تعادل في المزايدة! الأرقام متطابقة. يرجى إعادة إدخال المزايدة.");
        inputP1.value = ""; inputP2.value = "";
        if(aucType === "hidden") {
            hiddenAuctionTurn = 1;
            document.getElementById('bid-col-2').classList.add('hidden');
            document.getElementById('bid-col-1').classList.remove('hidden');
            document.getElementById('btn-confirm-bid').innerText = `تأكيد وتمرير الهاتف لـ ${aucP2Name}`;
        }
        return;
    }
    processAuctionResult(bid1, bid2);
});

document.getElementById('btn-receive-phone').addEventListener('click', () => {
    passPhoneOverlay.classList.add('hidden');
    hiddenAuctionTurn = 2;
    document.getElementById('bid-col-1').classList.add('hidden');
    document.getElementById('bid-col-2').classList.remove('hidden');
    document.getElementById('btn-confirm-bid').innerText = "كشف النتيجة النهائية";
    renderAucCards(aucP2Name, aucP2Cards);
});

function validateSingleBid(bidVal, budget) {
    if (!bidVal || bidVal.trim() === "") { alert("يجب إدخال رقم المزايدة!"); return false; }
    const bid = Number(bidVal);
    if (!Number.isInteger(bid)) { alert("يجب إدخال أرقام صحيحة فقط (لا يوجد نصف مليون)!"); return false; }
    if (budget === 0 && bid !== 0) { alert("رصيدك 0! يجب أن تضع 0 وتأخذ لاعباً عشوائياً مجانياً."); return false; }
    if (budget > 0 && bid < 1) { alert("الحد الأدنى للمزايدة هو 1 مليون!"); return false; }
    if (bid > budget) { alert(`لا يمكنك المزايدة برقم أكبر من ميزانيتك (${budget}M)!`); return false; }
    return true;
}

function processAuctionResult(bid1, bid2) {
    let dbToUse = [];
    if (currentAucPosition === "GK") dbToUse = dbGK;
    if (currentAucPosition === "DEF") dbToUse = dbDEF;
    if (currentAucPosition === "MID") dbToUse = dbMID;
    if (currentAucPosition === "FWD") dbToUse = dbFWD;
    
    const randomFallback = dbToUse.filter(p => p !== currentAucRevealedPlayer).sort(() => 0.5 - Math.random())[0];
    let p1Wins = (bid1 > bid2);
    
    if (activeAucEffects.p1Guarantee && !activeAucEffects.p2Guarantee) p1Wins = true;
    if (activeAucEffects.p2Guarantee && !activeAucEffects.p1Guarantee) p1Wins = false;
    if (!p1Wins && activeAucEffects.p1Steal) p1Wins = true; 
    if (p1Wins && activeAucEffects.p2Steal) p1Wins = false; 

    let finalBid1 = activeAucEffects.p1Discount ? Math.floor(bid1 / 2) : bid1;
    let finalBid2 = activeAucEffects.p2Discount ? Math.floor(bid2 / 2) : bid2;

    if (p1Wins) {
        aucSquadP1[currentAucPosition].push(currentAucRevealedPlayer);
        aucSquadP2[currentAucPosition].push(randomFallback);
        aucP1Budget -= finalBid1; aucP2Budget -= bid2; 
        alert(`🎉 فاز ${aucP1Name} بـ ${currentAucRevealedPlayer} مقابل ${finalBid1}M!\nحصل ${aucP2Name} على ${randomFallback} كلاعب عشوائي مقابل ${bid2}M.`);
    } else {
        aucSquadP2[currentAucPosition].push(currentAucRevealedPlayer);
        aucSquadP1[currentAucPosition].push(randomFallback);
        aucP2Budget -= finalBid2; aucP1Budget -= bid1;
        alert(`🎉 فاز ${aucP2Name} بـ ${currentAucRevealedPlayer} مقابل ${finalBid2}M!\nحصل ${aucP1Name} على ${randomFallback} كلاعب عشوائي مقابل ${bid1}M.`);
    }

    activeAucEffects = { p1Discount: false, p2Discount: false, p1Guarantee: false, p2Guarantee: false, p1Steal: false, p2Steal: false };
    updateAuctionUI();
    
    if(aucType === "hidden") {
        document.getElementById('bid-col-1').classList.remove('hidden');
        document.getElementById('btn-confirm-bid').innerText = `تأكيد وتمرير الهاتف لـ ${aucP2Name}`;
        hiddenAuctionTurn = 1;
        aucCardsContainer.classList.add('hidden'); 
    }

    currentAucIndex++; nextAuctionTurn();
}

function endAuction() {
    document.getElementById('bidding-area').classList.add('hidden');
    document.getElementById('auc-position-text').innerText = "انتهى المزاد!";
    document.getElementById('auc-revealed-card').classList.add('hidden');
    
    const result = simulateMatchResult(aucSquadP1, aucSquadP2);
    let finalMessage = "";

    if (result.p1Goals > result.p2Goals) finalMessage = `🏆 فاز فريق ${aucP1Name} بنتيجة ${result.p1Goals} - ${result.p2Goals}`;
    else if (result.p2Goals > result.p1Goals) finalMessage = `🏆 فاز فريق ${aucP2Name} بنتيجة ${result.p2Goals} - ${result.p1Goals}`;
    else finalMessage = `🤝 تعادل الفريقان بنتيجة ${result.p1Goals} - ${result.p2Goals}`;

    const resultEl = document.getElementById('auc-final-result');
    resultEl.innerText = finalMessage; resultEl.classList.remove('hidden');
    document.getElementById('btn-finish-auction').classList.remove('hidden');
}

document.getElementById('btn-finish-auction').addEventListener('click', () => {
    document.getElementById('auc-final-result').classList.add('hidden');
    document.getElementById('btn-finish-auction').classList.add('hidden');
    document.getElementById('auc-revealed-card').classList.remove('hidden');
    document.getElementById('bidding-area').classList.remove('hidden');
    hideAllScreens(); mainMenu.classList.remove('hidden');
});