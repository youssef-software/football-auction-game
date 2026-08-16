// ==========================================
// 1. تعريف الشاشات والأزرار الرئيسية
// ==========================================
const mainMenu = document.getElementById("main-menu");
const auctionScreen = document.getElementById("auction-screen");
const setupGuessScreen = document.getElementById("setup-guess-screen");
const guessScreen = document.getElementById("guess-screen");
const hpSetupScreen = document.getElementById("hp-setup-screen");
const hpGameScreen = document.getElementById("hp-game-screen");
const btnHighPressure = document.getElementById("btn-high-pressure");
const auctionGameScreen = document.getElementById("auction-game-screen");
const hiddenScreen = document.getElementById("hidden-screen"); // <-- الغلطة كانت هنا وتم تصليحها (تعريف الشاشة)

const btnAuction = document.getElementById("btn-auction");
const btnGuess = document.getElementById("btn-guess");
const btnHidden = document.getElementById("btn-hidden");
const backBtns = document.querySelectorAll(".back-btn");

let activeMode = "";

function hideAllScreens() {
  mainMenu.classList.add("hidden");
  auctionScreen.classList.add("hidden");
  setupGuessScreen.classList.add("hidden");
  guessScreen.classList.add("hidden");
  hpSetupScreen.classList.add("hidden");
  hpGameScreen.classList.add("hidden");
  hiddenScreen.classList.add("hidden");
  auctionGameScreen.classList.add("hidden");
}

// أزرار القائمة الرئيسية
btnAuction.addEventListener("click", () => {
  hideAllScreens();
  auctionScreen.classList.remove("hidden");
});
btnHidden.addEventListener("click", () => openSetupScreen("hidden"));
btnGuess.addEventListener("click", () => openSetupScreen("guess"));

btnHighPressure.addEventListener("click", () => {
  hideAllScreens();
  hpSetupScreen.classList.remove("hidden");
  resetHpSetup();
});

backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    hideAllScreens();
    mainMenu.classList.remove("hidden");
  });
});

// ==========================================
// 2. إعداد الأسماء والعجلة الدوارة (مشتركة)
// ==========================================
const nameInputsSection = document.getElementById("name-inputs");
const wheelSection = document.getElementById("wheel-section");
const player1Input = document.getElementById("player1-input");
const player2Input = document.getElementById("player2-input");
const btnNextToPlayer2 = document.getElementById("next-to-player2");
const btnStartWheel = document.getElementById("start-wheel-btn");
const wheel = document.getElementById("wheel");
const wheelP1Name = document.getElementById("wheel-p1-name");
const wheelP2Name = document.getElementById("wheel-p2-name");
const wheelResult = document.getElementById("wheel-result");
const btnGoToGame = document.getElementById("go-to-game-btn");

let p1Name = "";
let p2Name = "";
let startingPlayer = "";
let currentTurnName = "";

function openSetupScreen(mode) {
  activeMode = mode;
  hideAllScreens();
  setupGuessScreen.classList.remove("hidden");
  nameInputsSection.classList.remove("hidden");
  wheelSection.classList.add("hidden");
  player1Input.classList.remove("hidden");
  btnNextToPlayer2.classList.remove("hidden");
  player2Input.classList.add("hidden");
  btnStartWheel.classList.add("hidden");
  player1Input.value = "";
  player2Input.value = "";
  wheel.style.transform = `rotate(0deg)`;
  wheelResult.classList.add("hidden");
  btnGoToGame.classList.add("hidden");
}

btnNextToPlayer2.addEventListener("click", () => {
  if (player1Input.value.trim() === "") return alert("اكتب اسم اللاعب الأول");
  p1Name = player1Input.value;
  wheelP1Name.innerText = p1Name;
  player1Input.classList.add("hidden");
  btnNextToPlayer2.classList.add("hidden");
  player2Input.classList.remove("hidden");
  btnStartWheel.classList.remove("hidden");
});

btnStartWheel.addEventListener("click", () => {
  if (player2Input.value.trim() === "") return alert("اكتب اسم اللاعب الثاني");
  p2Name = player2Input.value;
  wheelP2Name.innerText = p2Name;
  nameInputsSection.classList.add("hidden");
  wheelSection.classList.remove("hidden");

  setTimeout(() => {
    const isPlayer1 = Math.random() < 0.5;
    const totalRotation =
      360 * 5 + (isPlayer1 ? 0 : 180) + (Math.floor(Math.random() * 60) - 30);
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
      startingPlayer = isPlayer1 ? p1Name : p2Name;
      wheelResult.innerText = `البداية مع: ${startingPlayer} 🎉`;
      wheelResult.classList.remove("hidden");
      btnGoToGame.classList.remove("hidden");
    }, 3000);
  }, 50);
});

btnGoToGame.addEventListener("click", () => {
  hideAllScreens();
  currentTurnName = startingPlayer;
  if (activeMode === "guess") {
    guessScreen.classList.remove("hidden");
    initGuessGame();
  } else if (activeMode === "hidden") {
    hiddenScreen.classList.remove("hidden");
    initHiddenGame();
  }
});

// ==========================================
// 3. قوائم اللاعبين المشتركة وحكم التقييم
// ==========================================
const dbGK = [
  "جانلويجي بوفون",
  "إيكر كاسياس",
  "مانويل نوير",
  "أوليفر كان",
  "بيتر شمايكل",
  "دينو زوف",
  "ليف ياشين",
  "إدوين فان دير سار",
  "بيتر تشيك",
  "تيبو كورتوا",
  "أليسون بيكر",
  "إيدرسون مويراس",
  "مارك أندريه تير شتيغن",
  "يان أوبلاك",
  "إميليانو مارتينيز",
  "جانلويجي دوناروما",
  "ديفيد دي خيا",
  "هوغو لوريس",
  "كيلور نافاس",
  "ينس ليمان",
  "جيرزي دوديك",
  "كاسبر شمايكل",
  "هاندانوفيتش",
  "ياسين بونو",
  "محمد الشناوي",
  "عصام الحضري",
  "أوناي سيمون",
  "ميك ماينان",
  "دافيد رايا",
  "جوردان بيكفورد",
  "فويتشيك شتشيسني",
  "يان سومر",
  "جريجور كوبيل",
  "روي باتريسيو",
  "أنتوني لوبيز",
  "غييرمو أوتشوا",
  "كلاوديو برافو",
  "سيرخيو روميرو",
  "إدوارد ميندي",
  "دين هيندرسون",
  "أرون رامسديل",
  "أنتوني سيلفا",
  "أندريه أونانا",
  "كيبا أريزابالاغا",
  "أندري لونين",
  "لوريس كاريوس",
  "جو هارت",
  "روبرت سانشيز",
  "نيتو",
  "إيناكي بينيا",
  "أدريان",
  "أليكساندر نوبل",
  "سفين أولرايش",
  "أنتونيو ميرانتي",
  "تيم كرول",
  "نيك بوب",
  "محمد أبو جبل",
  "أحمد الشناوي",
  "رايس مبولحي",
  "معتز ياسين",
];
const dbDEF = [
  "باولو مالديني",
  "فرانتس بيكنباور",
  "سيرخيو راموس",
  "فرانكو باريزي",
  "فابيو كانافارو",
  "كارليس بويول",
  "جون تيري",
  "نيمانيا فيديتش",
  "ريو فرديناند",
  "أليساندرو نيستا",
  "فيرجيل فان دايك",
  "روبرتو كارلوس",
  "داني ألفيش",
  "كافو",
  "فيليب لام",
  "خافيير زانيتي",
  "مارسيلو",
  "ليليان تورام",
  "رونالد كومان",
  "دانييل أغيري",
  "باتريس إيفرا",
  "أشرف حكيمي",
  "أنطونيو روديغر",
  "تياغو سيلفا",
  "جورجيو كيليني",
  "ليوناردو بونوتشي",
  "جيرارد بيكيه",
  "دانييل كارفاخال",
  "ألكسندر أرنولد",
  "ألفونسو ديفيز",
  "أﻧﺪﺭﻳﺎ ﺑﺎﺭﺯﺍﻟﻲ",
  "كاليدو كوليبالي",
  "ماركينيوس",
  "إيدير ميليتاو",
  "ويليام ساليبا",
  "غابرييل ماغالهايس",
  "جول كوندي",
  "رونالد أراوخو",
  "تيو هيرنانديز",
  "كايل ووكر",
  "أندرو روبرتسون",
  "دافيد ألابا",
  "رافاييل فاران",
  "ميسون هوملز",
  "دييغو غودين",
  "سامويل أومتيتي",
  "خوسيه خيمينيز",
  "سامي خضيرة",
  "يان أوبلاك",
  "ماتيس دي ليخت",
  "ياپ ستام",
  "سول كامبل",
  "ستيفان دي فري",
  "مهدي بن عطية",
  "علي معلول",
  "أحمد حجازي",
  "وائل جمعة",
  "إبراهيم سعيد",
  "هاني رمزي",
  "محمد عبد المنعم",
  "لوك شو",
  "ستانيسلاف لوبوتبكا",
  "كييران تريبير",
  "يوسكو غفارديول",
  "بنجامين بافارد",
  "إريك داير",
  "هاري ماغواير",
  "ديفيد لويز",
  "ديان لوفرين",
  "كورت زوما",
  "ناثان أكي",
  "ييري مينا",
  "خيسوس فاييخو",
  "كليمنت لينغليت",
  "إيميريك لابورت",
  "هيكتور بيليرين",
  "نيكولاس أوتاميندي",
  "جابرييل ",
  "سام برودفوت",
  "أندرياس كريستنسن",
  "ماتيا دي شيليو",
  "آرون وان بيساكا",
  "سيرجينو ديست",
  "محمود علاء",
  "علي جبر",
];
const dbMID = [
  "زين الدين زيدان",
  "تشافي هيرنانديز",
  "أندريس إنييستا",
  "لوكا مودريتش",
  "أندريا بيرلو",
  "توني كروس",
  "بول سكولز",
  "ستيفن جيرارد",
  "فرانك لامبارد",
  "كاكا",
  "رود خوليت",
  "لوتار ماتيوس",
  "سيرجيو بوسكيتس",
  "باتريك فييرا",
  "روي كين",
  "رودري",
  "كيفين دي بروين",
  "جود بيلينغهام",
  "نغولو كانتي",
  "مسعود أوزيل",
  "سيسك فابريغاس",
  "ديفيد بيكهام",
  "ميشيل بلاتيني",
  "سقراط",
  "زيكو",
  "غايتانو شيريا",
  "دييغو سيميوني",
  "كاسميرو",
  "خافيير زانيتي",
  "ميكايل بالاك",
  "باستيان شفاينشتايغر",
  "إدغار دافيدز",
  "جينارو غاتوزو",
  "تشابي ألونسو",
  "ويسلي سنايدر",
  "خوان رومان ريكلمي",
  "ديكو",
  "برونو فيرنانديز",
  "كلاوديو ماركيزيو",
  "فرينكي دي يونغ",
  "مارتين أوديجارد",
  "فيديريكو فالفيردي",
  "جمال موسيالا",
  "فلوريان فيرتز",
  "أوريليين تشواميني",
  "إدواردو كامافينغا",
  "ألكسيس ماك أليستر",
  "ديكلان رايس",
  "بيوتر زيلينسكي",
  "إلكاي غوندوغان",
  "ماركو فيراتي",
  "تياغو ألكانتارا",
  "كريستيان إريكسن",
  "سيرجي ميلينكوفيتش سافيتش",
  "ميراليم بيانيتش",
  "آرتور فيدال",
  "إسماعيل بن ناصر",
  "توماس بارتي",
  "فريد",
  "خاميس رودريغيز",
  "إيسكو",
  "يوري تيليمانس",
  "جورجينيو",
  "مارسيلو بروزوفيتش",
  "ماتيو كوفاتشيتش",
  "مؤمن زكريا",
  "طارق حامد",
  "حسام غالي",
  "محمد النني",
  "سكوت ماكتوميناي",
  "جيسي لينغارد",
  "أليكس أكسليد تشامبرلين",
  "هاري وينكس",
  "أندريه غوميز",
  "داني سيبايوس",
  "ديلي ألي",
  "روبن نيفيز",
  "يوسف فوفانا",
  "سعيد بن رحمة",
  "مارك كاسادو",
  "لوكاس توريرا",
  "لوبيز",
  "أمادو أونانا",
  "ماركوس يورينتي",
];
const dbFWD = [
  "ليونيل ميسي",
  "كريستيانو رونالدو",
  "دييغو مارادونا",
  "بيليه",
  "رونالدو الظاهرة",
  "رونالدينيو",
  "يوهان كرويف",
  "تييري هنري",
  "ماركو فان باستن",
  "جيرد مولر",
  "كريم بنزيما",
  "روبرت ليفاندوفسكي",
  "إرلينغ هالاند",
  "كيليان إمبابي",
  "نيمار جونيور",
  "محمد صلاح",
  "واين روني",
  "زلاتان إبراهيموفيتش",
  "لويس سواريز",
  "صامويل إيتو",
  "ديدييه دروغبا",
  "رود فان نيستلروي",
  "أندري شيفتشينكو",
  "غابرييل باتيستوتا",
  "روماريو",
  "ريفالدو",
  "جورج وياه",
  "كارل هاينز رومانيغه",
  "راؤول غونزاليس",
  "دافيد فيا",
  "فرينك بوشكاش",
  "أوزيبيو",
  "غارينشا",
  "روبين فان بيرسي",
  "أويريو أريين روبن",
  "فرانك ريبيري",
  "سيرخيو أجويرو",
  "هاري كين",
  "فينيسيوس جونيور",
  "ساديو ماني",
  "أنطوان غريزمان",
  "إدين هازارد",
  "غاريث بيل",
  "كارلوس تيفيز",
  "أليساندرو بييرو",
  "فرانسيسكو توتي",
  "مايكل أوان",
  "دنماركي ميكائيل لاودروب",
  "روبيرتو باجيو",
  "برانيسلاف بركامب",
  "جونزالو هيغواين",
  "راداميل فالكاو",
  "إدينسون كافاني",
  "فيكتور أوسيمين",
  "خوليان ألفاريز",
  "رودريغو",
  "لافوتارو مارتينيز",
  "بوكايو ساكا",
  "عثمان ديمبيلي",
  "سون هيونغ مين",
  "رياض محرز",
  "خفيتشا كفاراتسخيليا",
  "لويس فيغو",
  "باولو ديبالا",
  "ألكسيس سانشيز",
  "دييغو فورلان",
  "كلينسمان",
  "دانييل أورتيغا",
  "كريستيان فييري",
  "ماريو بالوتيلي",
  "نيكولاس جاكسون",
  "شيرو إيموبيلي",
  "تيمو فيرنر",
  "داروين نونيز",
  "ريتشارليسون",
  "ويلفريد زاها",
  "سيباستيان هالير",
  "ألفارو موراتا",
  "أنتوني",
  "أنطوني مارسيال",
  "ممفيس ديباي",
  "سالم الدوسري",
  "أوليفييه جيرو",
  "ووت فيغورست",
  "داني ويلبيك",
  "لوك دي يونغ",
  "خوسيلو",
  "تشوبو-موتينغ",
  "أليكساندر لاكازيت",
  "فينسنت أبوبكر",
  "أندي كارول",
  "سيرجي غنابري",
  "إيغالو",
];

const topStars = [
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
  "باولو مالديني",
  "فرانتس بيكنباور",
  "سيرخيو راموس",
  "فرانكو باريزي",
  "فابيو كانافارو",
  "كارليس بويول",
  "داني ألفيش",
  "ياپ ستام",
  "روبرتو كارلوس",
  "أليساندرو نيستا",
  "جون تيري",
  "سول كامبل",
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
  "نيمار جونيور",
];

const midStars = [
  "يان أوبلاك",
  "مارك أندريه تير شتيغن",
  "مايك ماينان",
  "إيميليانو مارتينيز",
  "أندري لونين",
  "أنطونيو روديغر",
  "تياغو سيلفا",
  "جورجيو كيليني",
  "ليوناردو بونوتشي",
  "جيرارد بيكيه",
  "ألكسندر أرنولد",
  "ألفونسو ديفيز",
  "تيو هيرنانديز",
  "كايل ووكر",
  "دافيد ألابا",
  "رافاييل فاران",
  "ماتس هوملز",
  "دييغو غودين",
  "يوسكو غفارديول",
  "ماتيس دي ليخت",
  "سيرجيو بوسكيتس",
  "رودري",
  "جود بيلينغهام",
  "نغولو كانتي",
  "سيسك فابريغاس",
  "كاسميرو",
  "كلاوديو ماكيليلي",
  "باستيان شفاينشتايغر",
  "تشابي ألونسو",
  "ويسلي سنايدر",
  "خوان رومان ريكلمي",
  "ديكو",
  "فرينكي دي يونغ",
  "مارتين أوديجارد",
  "فيديريكو فالفيردي",
  "جمال موسيالا",
  "فلوريان فيرتز",
  "إلكاي غوندوغان",
  "ماركو فيراتي",
  "تياغو ألكانتارا",
  "خاميس رودريغيز",
  "إيسكو",
  "كريم بنزيما",
  "إرلينغ هالاند",
  "واين روني",
  "ديدييه دروغبا",
  "رود فان نيستلروي",
  "أندري شيفتشينكو",
  "غابرييل باتيستوتا",
  "روماريو",
  "ريفالدو",
  "جورج وياه",
  "راؤول غونزاليس",
  "دافيد فيا",
  "روبين فان بيرسي",
  "أريين روبن",
  "فرانك ريبيري",
  "سيرخيو أجويرو",
  "هاري كين",
  "فينيسيوس جونيور",
  "ساديو ماني",
  "أنطوان غريزمان",
  "إدين هازارد",
  "غاريث بيل",
  "أليساندرو دل بييرو",
  "فرانشيسكو توتي",
  "روبرتو باجيو",
  "دينيس بيركامب",
  "راداميل فالكاو",
  "إدينسون كافاني",
  "فيكتور أوسيمين",
  "خوليان ألفاريز",
  "لاوتارو مارتينيز",
  "بوكايو ساكا",
  "سون هيونغ مين",
  "رياض محرز",
  "خفيتشا كفاراتسخيليا",
  "لويس فيغو",
  "باولو ديبالا",
  "دييغو فورلان",
];

function simulateMatchResult(squad1, squad2) {
  const calculatePower = (squad) => {
    let power = 0;
    ["GK", "DEF", "MID", "FWD"].forEach((pos) => {
      squad[pos].forEach((player) => {
        power += Math.floor(Math.random() * 4) + 6;
        if (topStars.includes(player)) power += 15;
        else if (midStars.includes(player)) power += 8;
      });
    });
    return power;
  };

  const power1 = calculatePower(squad1);
  const power2 = calculatePower(squad2);
  const powerDiff = Math.abs(power1 - power2);
  let p1Goals = 0;
  let p2Goals = 0;

  if (power1 > power2) {
    p1Goals = Math.floor(Math.random() * 2) + 2;
    p2Goals = Math.floor(Math.random() * 2);
    if (powerDiff > 25) p1Goals += Math.floor(Math.random() * 2) + 2;
  } else if (power2 > power1) {
    p2Goals = Math.floor(Math.random() * 2) + 2;
    p1Goals = Math.floor(Math.random() * 2);
    if (powerDiff > 25) p2Goals += Math.floor(Math.random() * 2) + 2;
  } else {
    p1Goals = Math.floor(Math.random() * 3) + 1;
    p2Goals = p1Goals;
  }
  return { p1Goals, p2Goals };
}

// ==========================================
// 4. طور "من اللاعب"
// ==========================================
let p1Score = 0;
let p2Score = 0;
const cardsContainer = document.getElementById("cards-container");
const allPowerCards = [
  "سؤال مضمون",
  "زيادة سؤال",
  "تغيير اللاعب والاعادة",
  "زيادة سؤالين",
  "أول حرف من اللاعب",
  "أول حرفين من اللاعب",
  "معرفة فريق اللاعب",
  "معرفة منتخب اللاعب",
];
let p1Cards = [];
let p2Cards = [];

const guessPlayers = [
  "ليونيل ميسي",
  "كريستيانو رونالدو",
  "دييغو مارادونا",
  "بيليه",
  "زين الدين زيدان",
  "رونالدو الظاهرة",
  "رونالدينيو",
  "يوهان كرويف",
  "باولو مالديني",
  "تشافي هيرنانديز",
  "أندريس إنييستا",
  "فرانتس بيكنباور",
  "جيرد مولر",
  "كارل هاينز رومانيجي ",
  "رومانيجي ",
  "بيرلو ",
  "ماركو فان باستن",
  "رود خوليت",
  "فرانك ريكارد",
  "لوتار ماتيوس",
  "توتي  ",
  "ريفالدو",
  "لويس فيجو",
  "مايكل أوين",
  "بافيل نيدفيد",
  "أندري شيفتشينكو",
  "فابيو كانافارو",
  "كاكا",
  "باتو بتاع ميلان",
  " جاريث بيل ",
  "روني ",
  "ليف ياشين",
  "كارل هاينز رومانيجي",
  " نوير",
  " كارل هيانز رومانيجي ",
  "محمد صلاح",
  "نيمار جونيور",
  "كيليان مبابي",
  "إيرلينغ هالاند",
  "فينيسيوس جونيور",
  "جود بيلينجهام",
  "كيفين دي بروين",
  "روبرت ليفاندوفسكي",
  "لوكا مودريتش",
  "كريم بنزيما",
  "سون هيونغ مين",
  "هاري كين",
  "بوكايو ساكا",
  "فيل فودين",
  "جمال موسيالا",
  "فلوريان فيرتز",
  "أنطوان جريزمان",
  "رودري",
  "ديكلان رايس",
  "كول بالمر",
  "لامين يامال",
  "بيدري",
  "جافي",
  "إدواردو كامافينجا",
  "أوريلين تشواميني",
  "رافاييل لياو",
  "خفيتشا كفاراتسخيليا",
  "فيكتور أوسيمين",
  "لاوتارو مارتينيز",
  "جوليان ألفاريز",
  "تييري هنري",
  "اغويرو  ",
  "باتريك فييرا",
  "ستيفن جيرارد",
  "فرانك لامبارد",
  "بول سكولز",
  "واين روني",
  "ريان غيغز",
  "راشفورد ",
  "زلاتان إبراهيموفيتش",
  "أليساندرو ديل بييرو",
  "فرانشيسكو توتي",
  "أندريا بيرلو",
  " كومباني",
  "فيليبو إنزاغي",
  "لويس فيغو ",
  "جابرييل باتيستوتا",
  " موراتا",
  " كيميتش ",
  "خوليت",
  "زيدان",
  "كافو",
  "روبرتو كارلوس",
  "ديفيد بيكهام",
  " ريبيري",
  "أرين روبن",
  "روبن فان بيرسي",
  "رود فان نيستلروي",
  "لويس سواريز",
  "إدينسون كافاني",
  "دييغو فورلان",
  "غاريث بيل",
  "سيرجيو راموس",
  "جيرارد بيكيه",
  "كارليس بويول",
  "جون تيري",
  "ريو فرديناند",
  " مالديني",
  "أليساندرو نيستا",
  "جورجيو كيلليني",
  "ليوناردو بونوتشي",
  "فيرجيل فان دايك",
  "روبن دياز",
  "ماركينيوس",
  "تياجو سيلفا",
  "بيبي",
  "خافيير زانيتي",
  "داني ألفيس",
  "مارسيلو",
  "أشرف حكيمي",
  "ترنت ألكساندر أرنولد",
  "كايل ووكر",
  "ألفونسو ديفيز",
  "أشلي كول",
  "فيليب لام",
  "بيكنباور ",
  " سالم الدوسري",
  " ماركوس تورام",
  " جونزالو راموس",
  " بونو",
  "كنيلغسي كومان ",
  "جواو فيلكس ",
  "جانلويجي بوفون",
  "إيكر كاسياس",
  "مانويل نوير",
  "أوليفر كان",
  "بيتر شمايكل",
  "إدوين فان در سار",
  "بيتر تشيك",
  "ديدا",
  "فرمينيو ",
  "أليسون بيكر",
  "إيدرسون",
  "تيبو كورتوا",
  "يان أوبلاك",
  "مارك أندريه تير شتيجن",
  "إيميليانو مارتينيز",
  "ياسين بونو",
  "هوجو لوريس",
  "جيانلويجي دوناروما",
  " ساديو ماني",
  "كيلور نافاس",
  "رياض محرز",
  "حكيم زياش",
  "ساديو ماني",
  "بيير إيميريك أوباميانغ",
  "ديدييه دروجبا",
  "صامويل إيتو",
  "راؤول ",
  "كيلور نافاس",
  "كوندي",
  "كوبارسي",
  "خاميس رودريغيز",
  "لويس دياز ",
  "أرتورو فيدال",
  "دييغو كوستا ",
  "أنخيل دي ماريا",
  "جونزالو هيجواين",
  "كاسيميرو",
  "تشابي ألونسو",
  " بوسكيتس",
  "برناندو سيلفا",
  "موراتا ",
  "فرناندو توريس",
  "ماركو رويس",
  "توماس مولر",
  "باستيان شفاينشتايجر",
  "توني كروس",
  "مسعود أوزيل",
  "إيلكاي جوندوجان",
  "ليروي ساني",
  "سيرج جنابري",
  "برونو فيرنانديز",
  "برناردو سيلفا",
  "جواو كانسيلو",
  "روبن نيفيز",
  "جواو فيليكس",
  "ديوجو جوتا",
  "كريم بنزيما",
  "مارتن أوديغارد",
  "ايسكو ",
  "إدواردو كامافينجا",
  "داروين نونيز",
  "كودي جاكبو",
  "انتوني  ",
  "فرينكي دي يونج",
  "ماتيس دي ليخت",
  "جيريمي فريمبونج",
  "ديل علي ",
  "كولو مواني",
  "أوليفييه جيرو",
  "عثمان ديمبيلي",
  "كينغسلي كومان",
  "نيكولو باريلا",
  "فيديريكو كييزا",
  "ساندرو تونالي",
  " ماردونا",
  "جيوكريس ",
  "جوسكو جفارديول",
  "ماتيو كوفاسيتش",
  "مارسيلو ",
  " فلاهوفيتش",
  "بافلوفيتش ",
  " لايمر ",
  "دومينيك سوبوسلاي",
  "أردا جولر",
  "مايكل اوليسي  ",
  "مايكل اوليسي ",
  "كيفين ديبروين ",
  "جاك جريليش",
  "رحيم ستيرلينج",
  "ماركوس راشفورد",
  "ميسون ماونت",
  "ريس جيمس",
  " ديفيد رايا",
  "ديفيد رايا",
  "جوردان بيكفورد",
  "جون ستونز",
  "هاري ماجواير",
  "لوك شاو",
  "كوكوريا ",
  "ماتياس ديليخت ",
  "إيميريك لابورت",
  "فيران توريس",
  "داني أولمو",
  "نيكو ويليامز",
  "أليكس جريمالدو",
  "مارك كوكوريلا",
  " كول بالمر",
  "فابينيو",
  "ريو فرناند",
  "أنتوني",
  "رافينيا",
  "رودريجو",
  "ريتشارليسون",
  "جابرييل جيسوس",
  "روبرتو فيرمينو",
  "دوغلاس كوستا",
  "أوسكار",
  "سباستيان شفانستيجر",
  "فيرناندينيو",
  "جيرارد بيكيه",
  "إيفان راكيتيتش",
  "اما عاشور ",
  "تريزيجه ",
  " هيونغ مين سون",
  "أليكسيس ماك أليستر",
  "إنزو فرنانديز",
  "كريستيان روميرو",
  "ليونيل ميسي ",
  "رودريجو دي باول",
  "ماركينيوس ",
  "ماريو جوتزه",
  "كوبل ",
  "بالينيا ",
  "كاي هافيرتز",
  " فيرتز",
  "ماتس هوملز",
  "جيروم بواتينغ",
  "ليون جوريتسكا",
  "جوشوا كيميتش",
  "ألفارو موراتا",
  "دييغو كوستا",
  "محمد هاني",
  "كيليان امبابي ",
  "روميلو لوكاكو",
  "إيدين هازارد",
  "فينسنت كومباني",
  "ايزاك ",
  " اوليفر كان",
  "الحضري ",
  "شوبير ",
  "اتكيتي ",
  "جيريمي دوكو",
  " مارتين اوديجارد",
  " ديفيد رايا ",
  "مانويل نوير ",
  "الشناوي",
  "داني اولمو ",
  "ألكسندر إيزاك",
  "فيكتو اوسمين ",
  "لامين يمال ",
  "فيلب لام ",
  "جرانيت تشاكا",
  "روبن دياز ",
];
let availableGuessPlayers = [...guessPlayers];

function shuffleAndDealCards() {
  let shuffled = [...allPowerCards].sort(() => 0.5 - Math.random());
  p1Cards = shuffled.slice(0, 3);
  shuffled = [...allPowerCards].sort(() => 0.5 - Math.random());
  p2Cards = shuffled.slice(0, 3);
}

function renderCards() {
  cardsContainer.innerHTML = "";
  const currentCards = currentTurnName === p1Name ? p1Cards : p2Cards;
  currentCards.forEach((cardName, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "power-card";
    cardEl.innerText = cardName;
    cardEl.onclick = () => {
      cardEl.classList.add("used");
      setTimeout(() => {
        if (currentTurnName === p1Name) p1Cards.splice(index, 1);
        else p2Cards.splice(index, 1);
        if (cardName === "تغيير اللاعب والاعادة") changePlayerOnly();
        else renderCards();
      }, 300);
    };
    cardsContainer.appendChild(cardEl);
  });
}

function changePlayerOnly() {
  if (availableGuessPlayers.length === 0)
    availableGuessPlayers = [...guessPlayers];
  const randomIndex = Math.floor(Math.random() * availableGuessPlayers.length);
  const randomPlayer = availableGuessPlayers[randomIndex];
  availableGuessPlayers.splice(randomIndex, 1);
  document.getElementById("random-player-name").innerText = randomPlayer;
  renderCards();
}

function initGuessGame() {
  p1Score = 0;
  p2Score = 0;
  availableGuessPlayers = [...guessPlayers];
  document.getElementById("btn-success").classList.remove("hidden");
  document.getElementById("btn-fail").classList.remove("hidden");
  shuffleAndDealCards();
  updateGuessUI();
}

function updateGuessUI() {
  document.getElementById("player1-score").innerText = `${p1Name}: ${p1Score}`;
  document.getElementById("player2-score").innerText = `${p2Name}: ${p2Score}`;
  document.getElementById("turn-indicator").innerText =
    `دور: ${currentTurnName}`;
  if (availableGuessPlayers.length === 0)
    availableGuessPlayers = [...guessPlayers];
  const randomIndex = Math.floor(Math.random() * availableGuessPlayers.length);
  const randomPlayer = availableGuessPlayers[randomIndex];
  availableGuessPlayers.splice(randomIndex, 1);
  document.getElementById("random-player-name").innerText = randomPlayer;
  renderCards();
}

function switchGuessTurn() {
  currentTurnName = currentTurnName === p1Name ? p2Name : p1Name;
  updateGuessUI();
}

document.getElementById("btn-success").addEventListener("click", () => {
  if (activeMode !== "guess") return;
  if (currentTurnName === p1Name) p1Score++;
  else p2Score++;
  if (p1Score === 3 || p2Score === 3) {
    document.getElementById("random-player-name").innerText =
      `🎉 فاز ${currentTurnName}! 🎉`;
    document.getElementById("player1-score").innerText =
      `${p1Name}: ${p1Score}`;
    document.getElementById("player2-score").innerText =
      `${p2Name}: ${p2Score}`;
    document.getElementById("btn-success").classList.add("hidden");
    document.getElementById("btn-fail").classList.add("hidden");
    cardsContainer.innerHTML = "";
    document.getElementById("turn-indicator").innerText = "انتهت اللعبة";
  } else switchGuessTurn();
});
document.getElementById("btn-fail").addEventListener("click", () => {
  if (activeMode === "guess") switchGuessTurn();
});

// ==========================================
// 5. طور "اللاعب الخفي"
// ==========================================
const formationLimits = { GK: 1, DEF: 2, MID: 2, FWD: 3 };
let p1Squad = { GK: [], DEF: [], MID: [], FWD: [] };
let p2Squad = { GK: [], DEF: [], MID: [], FWD: [] };
let currentNeededPos = "";
let currentVisiblePlayer = "";
let currentHiddenPlayer = "";
const visibleCard = document.getElementById("visible-card");
const hiddenCard = document.getElementById("hidden-card");
const visibleName = document.getElementById("visible-name");
const hiddenName = document.getElementById("hidden-name");
const positionText = document.getElementById("position-needed-text");

function initHiddenGame() {
  p1Squad = { GK: [], DEF: [], MID: [], FWD: [] };
  p2Squad = { GK: [], DEF: [], MID: [], FWD: [] };
  document.getElementById("h-p1-name").innerText = p1Name;
  document.getElementById("h-p2-name").innerText = p2Name;
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
    const el = document.getElementById(elementId);
    el.innerHTML = "";
    const allPlayers = [
      ...squad.GK.map((p) => `حارس: ${p}`),
      ...squad.DEF.map((p) => `دفاع: ${p}`),
      ...squad.MID.map((p) => `وسط: ${p}`),
      ...squad.FWD.map((p) => `هجوم: ${p}`),
    ];
    allPlayers.forEach((p) => {
      const li = document.createElement("li");
      li.innerText = p;
      el.appendChild(li);
    });
  };
  renderList(p1Squad, "h-p1-squad");
  renderList(p2Squad, "h-p2-squad");
}

function nextHiddenTurn() {
  renderSquads();
  document.getElementById("hidden-turn-indicator").innerText =
    `دور: ${currentTurnName}`;
  hiddenCard.className = "choice-card mystery";
  hiddenName.innerText = "؟";
  visibleCard.style.display = "flex";
  hiddenCard.style.display = "flex";

  let currentSquad = currentTurnName === p1Name ? p1Squad : p2Squad;
  let missing = getMissingPositions(currentSquad);

  if (missing.length === 0) {
    const result = simulateMatchResult(p1Squad, p2Squad);
    let finalMessage = "";
    if (result.p1Goals > result.p2Goals)
      finalMessage = `🏆 فاز ${p1Name} بنتيجة ${result.p1Goals} - ${result.p2Goals}`;
    else if (result.p2Goals > result.p1Goals)
      finalMessage = `🏆 فاز ${p2Name} بنتيجة ${result.p2Goals} - ${result.p1Goals}`;
    else
      finalMessage = `🤝 تعادل الفريقان بنتيجة ${result.p1Goals} - ${result.p2Goals}`;
    document.getElementById("hidden-turn-indicator").innerText = finalMessage;
    positionText.innerText = "انتهت اللعبة!";
    visibleCard.style.display = "none";
    hiddenCard.style.display = "none";
    renderSquads();
    return;
  }

  currentNeededPos = missing[Math.floor(Math.random() * missing.length)];
  let dbToUse = [];
  let posNameAR = "";
  if (currentNeededPos === "GK") {
    dbToUse = dbGK;
    posNameAR = "حارس مرمى";
  }
  if (currentNeededPos === "DEF") {
    dbToUse = dbDEF;
    posNameAR = "مدافع";
  }
  if (currentNeededPos === "MID") {
    dbToUse = dbMID;
    posNameAR = "خط وسط";
  }
  if (currentNeededPos === "FWD") {
    dbToUse = dbFWD;
    posNameAR = "مهاجم";
  }

  positionText.innerText = `مطلوب: ${posNameAR}`;
  let shuffledDb = [...dbToUse].sort(() => 0.5 - Math.random());
  currentVisiblePlayer = shuffledDb[0];
  currentHiddenPlayer = shuffledDb[1];
  visibleName.innerText = currentVisiblePlayer;
}
let isCardLocked = false;

visibleCard.onclick = () => {
  if (isCardLocked) return;
  isCardLocked = true;

  hiddenCard.classList.remove("mystery");
  hiddenCard.classList.add("revealed");
  hiddenName.innerText = currentHiddenPlayer;

  setTimeout(() => {
    addPlayerToSquad(currentVisiblePlayer);
  }, 1500);
};

hiddenCard.onclick = () => {
  if (isCardLocked) return;
  isCardLocked = true;

  hiddenCard.classList.remove("mystery");
  hiddenCard.classList.add("revealed");
  hiddenName.innerText = currentHiddenPlayer;

  setTimeout(() => {
    addPlayerToSquad(currentHiddenPlayer);
  }, 1000);
};

function addPlayerToSquad(player) {
  if (currentTurnName === p1Name) {
    p1Squad[currentNeededPos].push(player);
    currentTurnName = p2Name;
  } else {
    p2Squad[currentNeededPos].push(player);
    currentTurnName = p1Name;
  }

  isCardLocked = false;
  nextHiddenTurn();
}

// ==========================================
// 6. طور المزاد (المخفي والعلني بالكروت السحرية)
// ==========================================
const passPhoneOverlay = document.getElementById("pass-phone-overlay");
let aucP1Name = "";
let aucP2Name = "";
let aucP1Budget = 100;
let aucP2Budget = 100;
let aucPlayerCount = 5;
let aucType = "public";

let auctionPositions = [];
let currentAucIndex = 0;
let currentAucRevealedPlayer = "";
let currentAucPosition = "";
let aucSquadP1 = { GK: [], DEF: [], MID: [], FWD: [] };
let aucSquadP2 = { GK: [], DEF: [], MID: [], FWD: [] };
let aucAvailGK = [];
let aucAvailDEF = [];
let aucAvailMID = [];
let aucAvailFWD = [];

const allAucCards = [
  "+30 مليون",
  "+40 مليون",
  "+50 مليون",
  "خصم 50%",
  "ضرائب -70M",
  "منع المزايدة",
  "سرقة اللاعب",
];
let aucP1Cards = [];
let aucP2Cards = [];
let activeAucEffects = {
  p1Discount: false,
  p2Discount: false,
  p1Guarantee: false,
  p2Guarantee: false,
  p1Steal: false,
  p2Steal: false,
};
const aucCardsContainer = document.getElementById("auc-cards-container");
let hiddenAuctionTurn = 1;

document.querySelectorAll(".player-count").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".player-count")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    aucPlayerCount = parseInt(e.target.getAttribute("data-value"));
  });
});

document.querySelectorAll(".auction-type").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".auction-type")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    aucType = e.target.getAttribute("data-value");
  });
});

document
  .getElementById("start-auction-action")
  .addEventListener("click", () => {
    aucP1Name = document.getElementById("auc-p1-input").value.trim();
    aucP2Name = document.getElementById("auc-p2-input").value.trim();
    if (aucP1Name === "" || aucP2Name === "")
      return alert("يرجى إدخال أسماء اللاعبين!");

    if (aucPlayerCount === 11) {
      aucP1Budget = 1000;
      aucP2Budget = 1000;
    } else {
      aucP1Budget = 100;
      aucP2Budget = 100;
    }

    aucSquadP1 = { GK: [], DEF: [], MID: [], FWD: [] };
    aucSquadP2 = { GK: [], DEF: [], MID: [], FWD: [] };
    currentAucIndex = 0;
    aucAvailGK = [...dbGK];
    aucAvailDEF = [...dbDEF];
    aucAvailMID = [...dbMID];
    aucAvailFWD = [...dbFWD];

    let shuffled = [...allAucCards].sort(() => 0.5 - Math.random());
    aucP1Cards = shuffled.slice(0, 3);
    shuffled = [...allAucCards].sort(() => 0.5 - Math.random());
    aucP2Cards = shuffled.slice(0, 3);

    if (aucPlayerCount === 5)
      auctionPositions = ["GK", "DEF", "MID", "MID", "FWD"];
    else
      auctionPositions = [
        "GK",
        "DEF",
        "DEF",
        "DEF",
        "DEF",
        "MID",
        "MID",
        "MID",
        "FWD",
        "FWD",
        "FWD",
      ];

    hideAllScreens();
    auctionGameScreen.classList.remove("hidden");
    updateAuctionUI();
    nextAuctionTurn();
  });

function renderAucCards(currentPlayerName, playerCardsArray) {
  aucCardsContainer.innerHTML = "";
  aucCardsContainer.classList.remove("hidden");

  playerCardsArray.forEach((cardName, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "power-card";
    cardEl.innerText = cardName;

    cardEl.onclick = () => {
      cardEl.classList.add("used");
      const isP1 = currentPlayerName === aucP1Name;

      setTimeout(() => {
        if (cardName.includes("+")) {
          const amount = parseInt(cardName.replace(/\D/g, ""));
          if (isP1) aucP1Budget += amount;
          else aucP2Budget += amount;
          alert(`تم إضافة ${amount}M لميزانيتك!`);
        } else if (cardName === "ضرائب -70M") {
          if (isP1) aucP2Budget = Math.max(0, aucP2Budget - 70);
          else aucP1Budget = Math.max(0, aucP1Budget - 70);
          alert("تم سحب 70M من ميزانية خصمك!");
        } else if (cardName === "خصم 50%") {
          if (isP1) activeAucEffects.p1Discount = true;
          else activeAucEffects.p2Discount = true;
          alert("تفعيل الخصم! في حال فوزك ستدفع نصف مزايدتك فقط.");
        } else if (cardName === "منع المزايدة") {
          if (isP1) {
            aucP2Budget = Math.max(0, aucP2Budget - 10);
            activeAucEffects.p1Guarantee = true;
          } else {
            aucP1Budget = Math.max(0, aucP1Budget - 10);
            activeAucEffects.p2Guarantee = true;
          }
          alert("تم سحب 10M من خصمك، ومزايدتك ستفوز إجبارياً!");
        } else if (cardName === "سرقة اللاعب") {
          if (isP1) activeAucEffects.p1Steal = true;
          else activeAucEffects.p2Steal = true;
          alert("فخ السرقة مفعل! ستحصل على اللاعب بسعرك حتى لو فاز خصمك.");
        }

        if (isP1) aucP1Cards.splice(index, 1);
        else aucP2Cards.splice(index, 1);
        updateAuctionUI();
        renderAucCards(currentPlayerName, isP1 ? aucP1Cards : aucP2Cards);
      }, 300);
    };
    aucCardsContainer.appendChild(cardEl);
  });
}

function updateAuctionUI() {
  document.getElementById("auc-p1-name-display").innerText = aucP1Name;
  document.getElementById("auc-p2-name-display").innerText = aucP2Name;
  document.getElementById("auc-p1-budget").innerText = aucP1Budget + "M";
  document.getElementById("auc-p2-budget").innerText = aucP2Budget + "M";
  document.getElementById("label-bid-p1").innerText = `مزايدة ${aucP1Name}`;
  document.getElementById("label-bid-p2").innerText = `مزايدة ${aucP2Name}`;
}

function nextAuctionTurn() {
  if (currentAucIndex >= auctionPositions.length) {
    endAuction();
    return;
  }

  document.getElementById("auc-bid-p1").value = "";
  document.getElementById("auc-bid-p2").value = "";
  document.getElementById("bidding-area").classList.remove("hidden");

  currentAucPosition = auctionPositions[currentAucIndex];
  let dbToUse = null;
  let posNameAR = "";

  if (currentAucPosition === "GK") {
    dbToUse = aucAvailGK;
    posNameAR = "حارس مرمى";
  }
  if (currentAucPosition === "DEF") {
    dbToUse = aucAvailDEF;
    posNameAR = "مدافع";
  }
  if (currentAucPosition === "MID") {
    dbToUse = aucAvailMID;
    posNameAR = "خط وسط";
  }
  if (currentAucPosition === "FWD") {
    dbToUse = aucAvailFWD;
    posNameAR = "مهاجم";
  }

  if (dbToUse.length === 0) {
    if (currentAucPosition === "GK") dbToUse.push(...dbGK);
    if (currentAucPosition === "DEF") dbToUse.push(...dbDEF);
    if (currentAucPosition === "MID") dbToUse.push(...dbMID);
    if (currentAucPosition === "FWD") dbToUse.push(...dbFWD);
  }

  document.getElementById("auc-position-text").innerText =
    `المركز: ${posNameAR} (${currentAucIndex + 1}/${auctionPositions.length})`;

  const rIndex = Math.floor(Math.random() * dbToUse.length);
  currentAucRevealedPlayer = dbToUse.splice(rIndex, 1)[0];

  document.getElementById("auc-player-name").innerText =
    currentAucRevealedPlayer;

  if (aucType === "hidden") {
    document.getElementById("bid-col-2").classList.add("hidden");
    document.getElementById("auc-bid-p1").type = "password";
    document.getElementById("auc-bid-p2").type = "password";
    hiddenAuctionTurn = 1;
    document.getElementById("btn-confirm-bid").innerText =
      `تأكيد وتمرير الهاتف لـ ${aucP2Name}`;
    renderAucCards(aucP1Name, aucP1Cards);
  } else {
    document.getElementById("bid-col-2").classList.remove("hidden");
    document.getElementById("auc-bid-p1").type = "number";
    document.getElementById("auc-bid-p2").type = "number";
    document.getElementById("btn-confirm-bid").innerText =
      "اعتماد المزايدة للطرفين";
    aucCardsContainer.classList.add("hidden");
  }
}

document.getElementById("btn-confirm-bid").addEventListener("click", () => {
  const inputP1 = document.getElementById("auc-bid-p1");
  const inputP2 = document.getElementById("auc-bid-p2");

  if (aucType === "hidden" && hiddenAuctionTurn === 1) {
    if (!validateSingleBid(inputP1.value, aucP1Budget)) return;
    document.getElementById("pass-phone-text").innerText =
      `أعطِ الهاتف لـ ${aucP2Name}`;
    passPhoneOverlay.classList.remove("hidden");
    return;
  }

  const bid1 = parseInt(inputP1.value);
  const bid2 = parseInt(inputP2.value);
  if (
    !validateSingleBid(inputP1.value, aucP1Budget) ||
    !validateSingleBid(inputP2.value, aucP2Budget)
  )
    return;

  if (bid1 === bid2) {
    alert("🚨 تعادل في المزايدة! الأرقام متطابقة. يرجى إعادة إدخال المزايدة.");
    inputP1.value = "";
    inputP2.value = "";
    if (aucType === "hidden") {
      hiddenAuctionTurn = 1;
      document.getElementById("bid-col-2").classList.add("hidden");
      document.getElementById("bid-col-1").classList.remove("hidden");
      document.getElementById("btn-confirm-bid").innerText =
        `تأكيد وتمرير الهاتف لـ ${aucP2Name}`;
    }
    return;
  }
  processAuctionResult(bid1, bid2);
});

document.getElementById("btn-receive-phone").addEventListener("click", () => {
  passPhoneOverlay.classList.add("hidden");
  hiddenAuctionTurn = 2;
  document.getElementById("bid-col-1").classList.add("hidden");
  document.getElementById("bid-col-2").classList.remove("hidden");
  document.getElementById("btn-confirm-bid").innerText = "كشف النتيجة النهائية";
  renderAucCards(aucP2Name, aucP2Cards);
});

function validateSingleBid(bidVal, budget) {
  if (!bidVal || bidVal.trim() === "") {
    alert("يجب إدخال رقم المزايدة!");
    return false;
  }
  const bid = Number(bidVal);
  if (!Number.isInteger(bid)) {
    alert("يجب إدخال أرقام صحيحة فقط (لا يوجد نصف مليون)!");
    return false;
  }
  if (budget === 0 && bid !== 0) {
    alert("رصيدك 0! يجب أن تضع 0 وتأخذ لاعباً عشوائياً مجانياً.");
    return false;
  }
  if (budget > 0 && bid < 1) {
    alert("الحد الأدنى للمزايدة هو 1 مليون!");
    return false;
  }
  if (bid > budget) {
    alert(`لا يمكنك المزايدة برقم أكبر من ميزانيتك (${budget}M)!`);
    return false;
  }
  return true;
}

function processAuctionResult(bid1, bid2) {
  let dbToUse = null;
  if (currentAucPosition === "GK") dbToUse = aucAvailGK;
  if (currentAucPosition === "DEF") dbToUse = aucAvailDEF;
  if (currentAucPosition === "MID") dbToUse = aucAvailMID;
  if (currentAucPosition === "FWD") dbToUse = aucAvailFWD;

  if (dbToUse.length === 0) {
    if (currentAucPosition === "GK") dbToUse.push(...dbGK);
    if (currentAucPosition === "DEF") dbToUse.push(...dbDEF);
    if (currentAucPosition === "MID") dbToUse.push(...dbMID);
    if (currentAucPosition === "FWD") dbToUse.push(...dbFWD);
  }

  const fIndex = Math.floor(Math.random() * dbToUse.length);
  const randomFallback = dbToUse.splice(fIndex, 1)[0];
  let p1Wins = bid1 > bid2;

  if (activeAucEffects.p1Guarantee && !activeAucEffects.p2Guarantee)
    p1Wins = true;
  if (activeAucEffects.p2Guarantee && !activeAucEffects.p1Guarantee)
    p1Wins = false;
  if (!p1Wins && activeAucEffects.p1Steal) p1Wins = true;
  if (p1Wins && activeAucEffects.p2Steal) p1Wins = false;

  let finalBid1 = activeAucEffects.p1Discount ? Math.floor(bid1 / 2) : bid1;
  let finalBid2 = activeAucEffects.p2Discount ? Math.floor(bid2 / 2) : bid2;

  if (p1Wins) {
    aucSquadP1[currentAucPosition].push(currentAucRevealedPlayer);
    aucSquadP2[currentAucPosition].push(randomFallback);
    aucP1Budget -= finalBid1;
    aucP2Budget -= bid2;
    alert(
      `🎉 فاز ${aucP1Name} بـ ${currentAucRevealedPlayer} مقابل ${finalBid1}M!\nحصل ${aucP2Name} على ${randomFallback} كلاعب عشوائي مقابل ${bid2}M.`,
    );
  } else {
    aucSquadP2[currentAucPosition].push(currentAucRevealedPlayer);
    aucSquadP1[currentAucPosition].push(randomFallback);
    aucP2Budget -= finalBid2;
    aucP1Budget -= bid1;
    alert(
      `🎉 فاز ${aucP2Name} بـ ${currentAucRevealedPlayer} مقابل ${finalBid2}M!\nحصل ${aucP1Name} على ${randomFallback} كلاعب عشوائي مقابل ${bid1}M.`,
    );
  }

  activeAucEffects = {
    p1Discount: false,
    p2Discount: false,
    p1Guarantee: false,
    p2Guarantee: false,
    p1Steal: false,
    p2Steal: false,
  };
  updateAuctionUI();

  if (aucType === "hidden") {
    document.getElementById("bid-col-1").classList.remove("hidden");
    document.getElementById("btn-confirm-bid").innerText =
      `تأكيد وتمرير الهاتف لـ ${aucP2Name}`;
    hiddenAuctionTurn = 1;
    aucCardsContainer.classList.add("hidden");
  }

  currentAucIndex++;
  nextAuctionTurn();
}

function endAuction() {
  document.getElementById("bidding-area").classList.add("hidden");
  document.getElementById("auc-position-text").innerText = "انتهى المزاد!";
  document.getElementById("auc-revealed-card").classList.add("hidden");

  const result = simulateMatchResult(aucSquadP1, aucSquadP2);
  let finalMessage = "";

  if (result.p1Goals > result.p2Goals)
    finalMessage = `🏆 فاز فريق ${aucP1Name} بنتيجة ${result.p1Goals} - ${result.p2Goals}`;
  else if (result.p2Goals > result.p1Goals)
    finalMessage = `🏆 فاز فريق ${aucP2Name} بنتيجة ${result.p2Goals} - ${result.p1Goals}`;
  else
    finalMessage = `🤝 تعادل الفريقان بنتيجة ${result.p1Goals} - ${result.p2Goals}`;

  const resultEl = document.getElementById("auc-final-result");
  resultEl.innerText = finalMessage;
  resultEl.classList.remove("hidden");
  document.getElementById("btn-finish-auction").classList.remove("hidden");
}

document.getElementById("btn-finish-auction").addEventListener("click", () => {
  document.getElementById("auc-final-result").classList.add("hidden");
  document.getElementById("btn-finish-auction").classList.add("hidden");
  document.getElementById("auc-revealed-card").classList.remove("hidden");
  document.getElementById("bidding-area").classList.remove("hidden");
  hideAllScreens();
  mainMenu.classList.remove("hidden");
});

// ==========================================
// 7. طور الضغط العالي 💣
// ==========================================
let hpPlayerCount = 2;
let hpPlayers = [];
let currentHpIndex = 0;
let hpTimer = null;
const STARTING_TIME = 100;

// 1. تقسيم الأسئلة لثلاث مستويات (قم بإضافة باقي الـ 100 سؤال هنا بنفس الطريقة)
const hpEasyBank = [
  // --- أسئلتك السابقة ---
  "لاعب فاز بكأس العالم",
  "لاعب فاز بالكرة الذهبية",
  "لاعب برازيلي لعب في ريال مدريد",
  "لاعب ارتدى القميص رقم 10 في برشلونة",
  "حارس مرمى فاز بدوري أبطال أوروبا",
  "لاعب عربي احترف في الدوري الإنجليزي",
  "لاعب إيطالي فاز بكأس العالم",
  "لاعب فرنسي لعب في الدوري الإسباني",
  "مدرب فاز بدوري أبطال أوروبا",
  "لاعب زامل كريستيانو رونالدو في فريق واحد",
  "لاعب زامل ليونيل ميسي في فريق واحد",
  "لاعب أفريقي فاز بدوري أبطال أوروبا",
  "لاعب ارتدى الرقم 7 في مانشستر يونايتد",
  "لاعب فاز بكوبا أمريكا",
  "لاعب أرجنتيني لعب في الدوري الإنجليزي",
  "لاعب ارتدى الرقم 9 في منتخب البرازيل",
  "قائد فريق فاز بدوري أبطال أوروبا",
  "لاعب ألماني لعب في الدوري الإسباني",
  "لاعب هولندي لعب لبرشلونة",
  "لاعب برتغالي لعب في الدوري الإنجليزي",
  "لاعب فاز بكأس العالم للأندية",
  "لاعب إسباني فاز بكأس العالم 2010",
  "مهاجم إيطالي معروف",
  "لاعب عربي شارك في كأس العالم",
  "مدافع برازيلي مشهور",
  "لاعب فاز بجائزة بوشكاش (أفضل هدف)",
  "لاعب لعب في الدوري الفرنسي وانتقل لإنجلترا",
  "حارس مرمى ألماني",
  "لاعب ارتدى القميص رقم 10 في منتخب الأرجنتين",
  "لاعب بلجيكي لعب في الدوري الإنجليزي الممتاز",
  "لاعب سجل هدفاً في نهائي كأس العالم",
  "لاعب فاز بلقب كأس أمم أوروبا (اليورو)",
  "لاعب مثل أندية أرسنال وتشيلسي معاً",
  "لاعب كرواتي لعب لنادي ريال مدريد",
  "لاعب مصري لعب في الدوري الإنجليزي",
  "لاعب إسباني لعب في الدوري الإنجليزي الممتاز",
  "لاعب فاز ببطولة كأس أمم أفريقيا",
  "لاعب ارتدى القميص رقم 11 في ريال مدريد",
  "لاعب ألماني فاز بكأس العالم 2014",
  "لاعب برتغالي فاز بلقب يورو 2016",
  "لاعب فرنسي فاز بكأس العالم 2018",
  "لاعب ارتدى الرقم 8 في ليفربول",
  "لاعب هولندي لعب في الدوري الإنجليزي",
  "لاعب انتقل بصفقة تخطت حاجز الـ 100 مليون يورو",
  "مدافع إسباني فاز بدوري أبطال أوروبا",
  "لاعب شارك في 5 نسخ من كأس العالم",
  // --- 70 سؤال سهل إضافي ---
  "لاعب لعب لمانشستر سيتي",
  "لاعب ارتدى الرقم 9 في ريال مدريد",
  "مهاجم فرنسي مشهور",
  "لاعب إنجليزي فاز بدوري أبطال أوروبا",
  "لاعب لعب لباريس سان جيرمان",
  "حارس مرمى إسباني",
  "لاعب عربي فاز بدوري أبطال أوروبا",
  "لاعب برازيلي لعب لبرشلونة",
  "مدرب درب ريال مدريد",
  "لاعب ألماني لعب لبايرن ميونخ",
  "لاعب لعب لليفربول وانتقل لبرشلونة",
  "لاعب ارتدى الرقم 10 في باريس سان جيرمان",
  "مهاجم إنجليزي مشهور",
  "لاعب لعب ليوفنتوس",
  "لاعب أرجنتيني فاز بكأس العالم 2022",
  "لاعب مغربي تألق في كأس العالم 2022",
  "حارس مرمى برازيلي",
  "لاعب فرنسي فاز بدوري أبطال أوروبا",
  "مدرب درب مانشستر سيتي",
  "لاعب لعب لتشيلسي",
  "لاعب إسباني لعب لبرشلونة",
  "مهاجم أفريقي لعب في الدوري الإنجليزي",
  "لاعب ارتدى الرقم 11 في ليفربول",
  "لاعب برتغالي لعب لمانشستر يونايتد",
  "لاعب إيطالي لعب ليوفنتوس",
  "لاعب هولندي مشهور",
  "حارس مرمى فرنسي",
  "مدرب إيطالي مشهور",
  "لاعب لعب في الدوري السعودي",
  "لاعب لعب لأرسنال",
  "لاعب فاز بالدوري الإسباني",
  "لاعب برازيلي فاز بدوري أبطال أوروبا",
  "لاعب ارتدى الرقم 8 في ريال مدريد",
  "لاعب أرجنتيني لعب لبرشلونة",
  "مهاجم برازيلي لعب في أوروبا",
  "لاعب شارك في يورو 2024",
  "لاعب لعب لميلان الإيطالي",
  "لاعب ألماني فاز بدوري الأبطال",
  "حارس مرمى لعب لمانشستر يونايتد",
  "لاعب بلجيكي مشهور",
  "لاعب إسباني لعب في ريال مدريد",
  "مدرب إسباني مشهور",
  "لاعب كرواتي مشهور",
  "لاعب لعب لإنتر ميلان",
  "لاعب فاز بالدوري الإنجليزي الممتاز",
  "لاعب أوروجواياني لعب لبرشلونة",
  "لاعب أرجنتيني لعب لمانشستر سيتي",
  "لاعب سنغالي لعب في ليفربول",
  "لاعب جزائري لعب في مانشستر سيتي",
  "لاعب إنجليزي لعب لمانشستر يونايتد",
  "لاعب كولومبي لعب لريال مدريد",
  "حارس مرمى إيطالي لعب لباريس سان جيرمان",
  "لاعب فرنسي لعب لأرسنال",
  "لاعب نيجيري لعب في الدوري الإنجليزي",
  "لاعب برازيلي فاز بكوبا أمريكا",
  "مدرب درب ليفربول",
  "لاعب لعب لبايرن ميونخ وانتقل لريال مدريد",
  "لاعب برتغالي فاز بدوري الأبطال",
  "لاعب فاز بالدوري الإيطالي",
  "لاعب ألماني لعب في تشيلسي",
  "لاعب ارتدى الرقم 10 في مانشستر يونايتد",
  "لاعب ارتدى الرقم 4 في ريال مدريد",
  "لاعب لعب في كأس العالم 2022",
  "حارس مرمى تصدى لركلة جزاء في كأس العالم",
  "لاعب سجل في الكلاسيكو الإسباني",
  "لاعب عربي لعب في الدوري الإسباني",
  "لاعب لعب لروما الإيطالي",
  "لاعب فاز بكأس أمم أفريقيا 2021",
  "مدرب ألماني مشهور",
  "لاعب برازيلي ارتدى الرقم 10",
];

const hpMediumBank = [
  // --- أسئلتك السابقة ---
  "مدافع سجل هدف في كأس العالم",
  "لاعب لعب لبايرن ميونخ وبروسيا دورتموند",
  "مهاجم سجل أكثر من 30 هدف في موسم واحد بالدوري الإنجليزي",
  "لاعب فاز بدوري أبطال أوروبا مع فريقين مختلفين",
  "لاعب إنجليزي احترف خارج إنجلترا",
  "لاعب لعب لقطبي ميلان (الإنتر وميلان)",
  "لاعب لعب لريال مدريد وبرشلونة",
  "لاعب فاز بالحذاء الذهبي الأوروبي",
  "حارس مرمى تصدى لركلة جزاء في نهائي",
  "لاعب خط وسط إنجليزي معتزل",
  "لاعب كولومبي مشهور",
  "أسطورة كرة قدم معتزل قبل عام 2000",
  "لاعب حقق الثلاثية التاريخية (الدوري والكأس والأبطال)",
  "لاعب سجل هاتريك في مباراة كلاسيكو",
  "حارس مرمى فاز بجائزة أفضل حارس في العالم (ياشين)",
  "مهاجم فاز بجائزة هداف الدوري الإسباني (البيتشيتشي)",
  "لاعب حقق دوري أبطال أوروبا 3 مرات متتالية",
  "مدافع فاز بجائزة الكرة الذهبية",
  "لاعب تجاوز حاجز الـ 100 هدف دولي مع منتخبه",
  "مدرب فاز بلقب كأس العالم كمدرب ولاعب",
  "حارس مرمى حافظ على نظافة شباكه في نهائي أبطال أوروبا",
  "مهاجم فاز بالحذاء الذهبي لكأس العالم (هداف البطولة)",
  "لاعب فاز بجائزة الفتى الذهبي (Golden Boy)",
  "حارس مرمى إيطالي خاض أكثر من 100 مباراة دولية",
  "لاعب سجل سوبر هاتريك (4 أهداف) في مباراة واحدة بدوري الأبطال",
  "لاعب فاز بلقب الدوري الإنجليزي الممتاز مع ناديين مختلفين",
  "لاعب غير أوروبي فاز بلقب هداف الدوري الإيطالي (الكالتشيو)",
  "مدافع سجل أكثر من 10 أهداف في موسم واحد بجميع المسابقات",
  "لاعب مثل الغريمين مانشستر يونايتد ومانشستر سيتي",
  "لاعب حقق لقب الدوري الذهبي (دون هزيمة) في أي دوري أوروبي",
  "لاعب فاز بكأس ليبرتادوريس ودوري أبطال أوروبا",
  "لاعب أوروجواياني لعب في الدوري الإيطالي",
  "لاعب سجل هدفاً ضد فريقه السابق واحتفل",
  "لاعب طُرد في المباراة النهائية لكأس العالم",
  "لاعب فاز بالدوري الأوروبي (اليوروباليج) 3 مرات على الأقل",
  "لاعب لعب تحت قيادة بيب جوارديولا وجوزيه مورينيو",
  "لاعب تركي احترف في الدوري الإسباني أو الألماني",
  "لاعب فاز بالحذاء الذهبي الأوروبي دون اللعب لريال مدريد أو برشلونة",
  "لاعب ياباني أو كوري جنوبي فاز بلقب أوروبي",
  "لاعب شارك كبديل وسجل هدفين في نهائي دوري أبطال أوروبا",
  "لاعب حقق لقب الدوري في إسبانيا وإيطاليا وإنجلترا",
  // --- 40 سؤال متوسط إضافي ---
  "لاعب لعب لتشيلسي وريال مدريد",
  "لاعب لعب لأرسنال وبرشلونة",
  "لاعب فاز بكأس العالم ودوري الأبطال في نفس العام",
  "لاعب ارتدى الرقم 10 في يوفنتوس",
  "لاعب أفريقي لعب لريال مدريد",
  "لاعب إنجليزي ارتدى قميص ريال مدريد",
  "لاعب حقق دوري أبطال أوروبا مع بايرن ميونخ",
  "لاعب إيطالي فاز بجائزة الكرة الذهبية",
  "لاعب لعب لمانشستر يونايتد وريال مدريد",
  "مدرب فاز بالدوري الإنجليزي مع فريقين مختلفين",
  "لاعب أرجنتيني ارتدى الرقم 10 في إنتر ميلان",
  "لاعب لعب لليفربول وبايرن ميونخ",
  "حارس مرمى إسباني فاز بكأس العالم",
  "لاعب برازيلي فاز بجائزة الكرة الذهبية",
  "لاعب سجل هاتريك في دوري أبطال أوروبا",
  "لاعب فرنسي لعب لبايرن ميونخ",
  "لاعب فاز بالدوري الإنجليزي مع ليستر سيتي",
  "لاعب عربي لعب لروما الإيطالي",
  "لاعب ارتدى الرقم 7 في يوفنتوس",
  "لاعب لعب لبروسيا دورتموند وريال مدريد",
  "لاعب سجل في نهائي يورو",
  "حارس مرمى لعب لتشيلسي وريال مدريد",
  "لاعب ألماني لعب لريال مدريد",
  "لاعب حقق الدوري الإيطالي مع يوفنتوس وميلان",
  "لاعب إسباني لعب لبايرن ميونخ",
  "لاعب لعب لأتلتيكو مدريد وبرشلونة",
  "لاعب سجل هدفاً من ركلة حرة في كأس العالم",
  "لاعب كرواتي فاز بدوري أبطال أوروبا",
  "لاعب لعب لمانشستر سيتي وبرشلونة",
  "لاعب أفريقي فاز بجائزة أفضل لاعب في الدوري الإنجليزي",
  "لاعب لعب لباريس سان جيرمان ويوفنتوس",
  "مدرب درب تشيلسي وريال مدريد",
  "لاعب برتغالي ارتدى الرقم 7 قبل كريستيانو رونالدو",
  "لاعب هولندي فاز بدوري أبطال أوروبا",
  "لاعب ارتدى الرقم 9 في بايرن ميونخ",
  "لاعب عربي توج بلقب الدوري الإنجليزي",
  "لاعب لعب لمارسيليا وباريس سان جيرمان",
  "لاعب لعب لمانشستر يونايتد ويوفنتوس",
  "لاعب فاز بكأس العالم ولم يلعب لأي نادي أوروبي",
  "لاعب ارتدى الرقم 14 في ريال مدريد أو برشلونة",
];

const hpHardBank = [
  // --- أسئلتك السابقة ---
  "لاعب فاز بدوري أبطال أوروبا مع 3 أندية مختلفة",
  "حارس مرمى سجل هدفاً في مباراة رسمية",
  "لاعب فاز بدوري أبطال آسيا ودوري أبطال أوروبا",
  "لاعب فاز بكأس العالم وكأس القارات واليورو ودوري الأبطال معاً",
  "لاعب حصل على بطاقة حمراء دون أن يلمس الكرة بعد نزوله بديلاً",
  "لاعب حقق لقب الهداف في نسختين متتاليتين من كأس العالم",
  "لاعب سجل في 6 بطولات رسمية مختلفة للمنتخبات ونفس الرقم للأندية",
  "حارس مرمى تصدى لـ 4 ركلات ترجيح في نهائي بطولة قارية",
  "لاعب فاز بدوري أبطال أوروبا في موسمين متتاليين مع فريقين مختلفين",
  "لاعب مثل 4 منتخبات وطنية مختلفة في مسيرته الدولية",
  "مهاجم سجل خماسية (5 أهداف) في أقل من 10 دقائق بمباراة رسمية",
  "لاعب شارك في نهائي كأس العالم تحت علم دولتين مختلفتين",
  "لاعب حصد لقب الدوري المحلي في 5 دول أوروبية مختلفة",
  "الحارس الوحيد الذي حصل على تقييم 10 في مباراة بدوري أبطال أوروبا",
  "مهاجم ألماني فاز بالكرة الذهبية مرتين متتاليتين",
  // --- 20 سؤال صعب إضافي (واقعي وممكن) ---
  "لاعب لعب لأندية: يوفنتوس، ميلان، وإنتر ميلان",
  "لاعب إنجليزي فاز بالدوري الإسباني (الليغا)",
  "لاعب أفريقي ارتدى القميص رقم 9 في برشلونة",
  "حارس مرمى صنع هدفاً (أسيست) في الدوري الإنجليزي",
  "لاعب لعب لبرشلونة وبايرن ميونخ وليفربول",
  "لاعب سجل هاتريك في نهائي كأس العالم",
  "مدرب حقق دوري أبطال أوروبا كلاعب وكمدرب",
  "لاعب فاز بالكرة الذهبية ولم يفز بدوري أبطال أوروبا أبداً",
  "لاعب أرجنتيني لعب لريال مدريد ومانشستر يونايتد",
  "لاعب ارتدى القميص رقم 10 في ريال مدريد قبل لوكا مودريتش",
  "لاعب سجل في نهائي دوري أبطال أوروبا ونهائي كأس العالم",
  "لاعب لعب لقطبي لندن (أرسنال وتوتنهام)",
  "حارس مرمى فاز بجائزة لاعب الموسم في الدوري الإنجليزي",
  "لاعب توج بكأس العالم وكأس أمم أوروبا متتاليين",
  "لاعب سجل 5 أهداف في مباراة واحدة بدوري أبطال أوروبا",
  "لاعب أمريكي جنوبي فاز بهداف الدوري الإنجليزي",
  "لاعب فاز بالدوري في 3 بطولات أوروبية كبرى مختلفة",
  "لاعب ارتدى شارة قيادة منتخب البرازيل في كأس العالم 2014 أو 2018",
  "لاعب توج بالكرة الذهبية من قارة أفريقيا",
  "لاعب عربي سجل في شباك ريال مدريد أو برشلونة",
];

// سلات الأسئلة المؤقتة لمنع التكرار
let availEasy = [];
let availMedium = [];
let availHard = [];

// 2. نمط توزيع الأسئلة (5 سهل، 3 متوسط، 1 صعب)
const difficultyPattern = [
  "easy",
  "easy",
  "easy",
  "easy",
  "easy",
  "medium",
  "medium",
  "medium",
  "hard",
];
let currentPatternIndex = 0;

document.querySelectorAll(".hp-count").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".hp-count")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    hpPlayerCount = parseInt(e.target.getAttribute("data-value"));

    document
      .getElementById("hp-p3-input")
      .classList.toggle("hidden", hpPlayerCount < 3);
    document
      .getElementById("hp-p4-input")
      .classList.toggle("hidden", hpPlayerCount < 4);
  });
});

function resetHpSetup() {
  document.getElementById("hp-settings-section").classList.remove("hidden");
  document.getElementById("hp-wheel-section").classList.add("hidden");
  document.getElementById("hp-wheel-result").classList.add("hidden");
  document.getElementById("btn-go-hp-game").classList.add("hidden");
  document.getElementById("hp-wheel").style.transform = `rotate(0deg)`;
}

document.getElementById("btn-start-hp-wheel").addEventListener("click", () => {
  hpPlayers = [];
  for (let i = 1; i <= hpPlayerCount; i++) {
    const name = document.getElementById(`hp-p${i}-input`).value.trim();
    if (name === "") return alert(`يرجى إدخال اسم اللاعب ${i}`);
    // أضفنا patternIndex: 0 ليكون لكل لاعب مؤشره الخاص
    hpPlayers.push({
      name: name,
      time: STARTING_TIME,
      isOut: false,
      index: i - 1,
      patternIndex: 0,
    });
  }

  const hpWheel = document.getElementById("hp-wheel");
  hpWheel.innerHTML = "";
  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6"];

  let gradient = "conic-gradient(";
  let step = 100 / hpPlayerCount;
  let angleStep = 360 / hpPlayerCount;

  for (let i = 0; i < hpPlayerCount; i++) {
    gradient += `${colors[i]} ${i * step}% ${(i + 1) * step}%${i === hpPlayerCount - 1 ? "" : ","}`;

    let nameDiv = document.createElement("div");
    nameDiv.innerText = hpPlayers[i].name;
    nameDiv.style.position = "absolute";
    nameDiv.style.width = "100%";
    nameDiv.style.textAlign = "center";
    nameDiv.style.top = "50%";
    nameDiv.style.left = "0";
    nameDiv.style.color = "white";
    nameDiv.style.fontWeight = "bold";
    nameDiv.style.fontSize = "1.2rem";
    nameDiv.style.textShadow = "2px 2px 4px rgba(0,0,0,0.8)";
    nameDiv.style.marginTop = "-0.8rem";

    let rotationAngle = i * angleStep + angleStep / 2;
    nameDiv.style.transform = `rotate(${rotationAngle}deg) translateY(-65px)`;

    hpWheel.appendChild(nameDiv);
  }
  gradient += ")";
  hpWheel.style.background = gradient;

  document.getElementById("hp-settings-section").classList.add("hidden");
  document.getElementById("hp-wheel-section").classList.remove("hidden");

  setTimeout(() => {
    const winnerIndex = Math.floor(Math.random() * hpPlayerCount);
    currentHpIndex = winnerIndex;

    const totalRotation =
      360 * 5 +
      (360 - winnerIndex * (360 / hpPlayerCount) - 180 / hpPlayerCount);
    hpWheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
      document.getElementById("hp-wheel-result").innerText =
        `البداية مع: ${hpPlayers[currentHpIndex].name} 💣`;
      document.getElementById("hp-wheel-result").classList.remove("hidden");
      document.getElementById("btn-go-hp-game").classList.remove("hidden");
    }, 3000);
  }, 50);
});

// تهيئة السلات وبدء اللعبة
document.getElementById("btn-go-hp-game").addEventListener("click", () => {
  hideAllScreens();
  hpGameScreen.classList.remove("hidden");

  // تفريغ الأسئلة في السلات وخلطها
  availEasy = [...hpEasyBank].sort(() => 0.5 - Math.random());
  availMedium = [...hpMediumBank].sort(() => 0.5 - Math.random());
  availHard = [...hpHardBank].sort(() => 0.5 - Math.random());
  currentPatternIndex = 0; // تصفير النمط

  updateHpStatusBoard();
  showPassScreen();
});

function updateHpStatusBoard() {
  const board = document.getElementById("hp-status-board");
  board.innerHTML = "";
  hpPlayers.forEach((p) => {
    const div = document.createElement("div");
    div.className = `hp-player-status ${p.isOut ? "out" : ""}`;
    div.innerText = `${p.name}: ${p.time}ث`;
    board.appendChild(div);
  });
}

function updateHpTimerUI() {
  const time = hpPlayers[currentHpIndex].time;
  const timerEl = document.getElementById("hp-timer");
  const container = document.querySelector(".hp-timer-container");

  timerEl.innerText = time;
  container.className = "hp-timer-container";
  if (time <= 10) container.classList.add("danger");
  else if (time <= 30) container.classList.add("warning");
}

function drawHpQuestion() {
  // 1. قراءة المؤشر الخاص باللاعب الحالي
  let pIndex = hpPlayers[currentHpIndex].patternIndex;
  let neededDifficulty = difficultyPattern[pIndex];
  let targetBank, targetAvail, labelPrefix;

  if (neededDifficulty === "easy") {
    targetBank = hpEasyBank;
    targetAvail = availEasy;
    labelPrefix = "🟢 سهل:";
  } else if (neededDifficulty === "medium") {
    targetBank = hpMediumBank;
    targetAvail = availMedium;
    labelPrefix = "🟡 متوسط:";
  } else {
    targetBank = hpHardBank;
    targetAvail = availHard;
    labelPrefix = "🔴 صعب:";
  }

  if (targetAvail.length === 0) {
    targetAvail.push(...targetBank);
    targetAvail.sort(() => 0.5 - Math.random());
  }

  let question = targetAvail.pop();
  document.getElementById("hp-question-text").innerText =
    `${labelPrefix} ${question}`;

  // 2. زيادة المؤشر الشخصي للاعب الحالي فقط للالتزام بنمطه
  hpPlayers[currentHpIndex].patternIndex =
    (pIndex + 1) % difficultyPattern.length;
}

function showPassScreen() {
  clearInterval(hpTimer);
  document.getElementById("hp-pass-text").innerText =
    `أعطِ الهاتف لـ ${hpPlayers[currentHpIndex].name}`;
  document.getElementById("hp-pass-overlay").classList.remove("hidden");
}

document.getElementById("btn-hp-ready").addEventListener("click", () => {
  document.getElementById("hp-pass-overlay").classList.add("hidden");
  document.getElementById("hp-current-turn-name").innerText =
    `دور: ${hpPlayers[currentHpIndex].name}`;
  drawHpQuestion();

  // خصم ثانية فوراً بمجرد الاستلام لمنع خدعة الضغط السريع
  hpPlayers[currentHpIndex].time--;
  updateHpTimerUI();
  updateHpStatusBoard();

  hpTimer = setInterval(() => {
    hpPlayers[currentHpIndex].time--;
    updateHpTimerUI();
    updateHpStatusBoard();

    if (hpPlayers[currentHpIndex].time <= 0) {
      clearInterval(hpTimer);
      eliminateCurrentPlayer();
    }
  }, 1000);
});

document.getElementById("btn-hp-next").addEventListener("click", () => {
  clearInterval(hpTimer);
  moveToNextPlayer();
});

document.getElementById("btn-hp-skip").addEventListener("click", () => {
  hpPlayers[currentHpIndex].time -= 10;
  if (hpPlayers[currentHpIndex].time <= 0) {
    clearInterval(hpTimer);
    hpPlayers[currentHpIndex].time = 0;
    eliminateCurrentPlayer();
  } else {
    updateHpTimerUI();
    updateHpStatusBoard();
    drawHpQuestion();
  }
});

function moveToNextPlayer() {
  let activePlayersCount = hpPlayers.filter((p) => !p.isOut).length;
  if (activePlayersCount <= 1) return;

  do {
    currentHpIndex = (currentHpIndex + 1) % hpPlayers.length;
  } while (hpPlayers[currentHpIndex].isOut);

  showPassScreen();
}

function eliminateCurrentPlayer() {
  hpPlayers[currentHpIndex].isOut = true;
  updateHpStatusBoard();
  alert(`💥 بوم! انتهى وقت ${hpPlayers[currentHpIndex].name} وخرج من التحدي!`);

  let activePlayers = hpPlayers.filter((p) => !p.isOut);
  if (activePlayers.length === 1) {
    alert(
      `🏆 مبرووووك! الفائز بلقب بطل الضغط العالي هو: ${activePlayers[0].name} 🎉`,
    );
    hideAllScreens();
    mainMenu.classList.remove("hidden");
  } else {
    moveToNextPlayer();
  }
}
