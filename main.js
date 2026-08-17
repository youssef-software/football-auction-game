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
const whoamiScreen = document.getElementById("whoami-screen");
const btnWhoAmI = document.getElementById("btn-whoami");
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
  whoamiScreen.classList.add("hidden");
}

// أزرار القائمة الرئيسية
btnAuction.addEventListener("click", () => {
  hideAllScreens();
  auctionScreen.classList.remove("hidden");
});
btnHidden.addEventListener("click", () => openSetupScreen("hidden"));
btnGuess.addEventListener("click", () => openSetupScreen("guess"));
btnWhoAmI.addEventListener("click", () => openSetupScreen("whoami"));

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
  } else if (activeMode === "whoami") {
    whoamiScreen.classList.remove("hidden");
    initWhoAmIGame();
  } // السطر الجديد
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
// ==========================================
// 8. طور "من أنا؟" (7 تلميحات = 70 نقطة) 🕵️‍♂️
// ==========================================
let waiP1Score = 0;
let waiP2Score = 0;
const WAI_WIN_TARGET = 21;
let currentWaiPlayer = null;
let currentHintIndex = 0; // يبدأ من 0 (التلميح الأول)
let currentWaiPoints = 7; // التلميح الأول بـ 7 نقاط

// قاعدة بيانات اللاعبين (كل لاعب له 7 تلميحات مرتبة من الأصعب للأسهل)
const whoAmIBank = [
  {
    name: "كيفين دي بروين",
    hints: [
      "1. أنا لاعب حالي .",
      "2. مركزي الأساسي هو خط الوسط وصانع ألعاب.",
      "3. بدأت مسيرتي الاحترافية في بلجيكا مع نادي جينك.",
      "4. فشلت تجربتي الأولى في إنجلترا وتم إعارتي وبيع عقدي.",
      "5. تألقت لاحقاً تحت قيادة بيب جوارديولا وحصدت الأخضر واليابس.",
      "6. أنا بلجيكي الجنسية، والقائد الثاني في فريقي الحالي.",
      "7. ألعب لمانشستر سيتي وأصنع الكثير من الأهداف لإيرلينغ هالاند.",
    ],
  },
  {
    name: "زلاتان إبراهيموفيتش",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو رأس الحربة (مهاجم صريح).",
      "3. بدأت مسيرتي في السويد مع نادي مالمو.",
      "4. لعبت لأكبر أندية أوروبا ورغم ذلك لم أحقق دوري أبطال أوروبا أبداً.",
      "5. لعبت تحت قيادة جوارديولا ومورينيو، ولعبت لقطبي مدينة ميلانو.",
      "6. أنا المهاجم التاريخي لمنتخب السويد.",
      "7. أشتهر بتصريحاتي المغرورة، وألقب نفسي بـ (الأسد).",
    ],
  },
  {
    name: "ليونيل ميسي",
    hints: [
      "1. أنا لاعب حالي.",
      "2. ألعب كجناح أيمن أو صانع ألعاب أو مهاجم وهمي.",
      "3. عانيت في طفولتي من نقص هرمون النمو وكدت أفقد حلمي الكروي.",
      "4. أنا اللاعب الأكثر تتويجاً بالكرة الذهبية في التاريخ (8 مرات).",
      "5. حصدت السداسية التاريخية تحت قيادة بيب جوارديولا.",
      "6. أنا أرجنتيني، والهداف التاريخي لنادي برشلونة.",
      "7. توجت بكأس العالم 2022، وأرتدي القميص رقم 10.",
    ],
  },
  {
    name: "كريستيانو رونالدو",
    hints: [
      "1. أنا لاعب حالي.",
      "2. بدأت كجناح أيسر وتحولت إلى مهاجم صريح.",
      "3. نشأت في جزيرة صغيرة، ولعبت لسبورتينج لشبونة في بداياتي.",
      "4. أنا الهداف التاريخي لبطولة دوري أبطال أوروبا.",
      "5. حققت 3 ألقاب أبطال متتالية تحت قيادة زين الدين زيدان.",
      "6. أنا برتغالي، والهداف التاريخي لنادي ريال مدريد.",
      "7. أمتلك 5 كرات ذهبية، وأشتهر باحتفال (Siuuu).",
    ],
  },
  {
    name: "نيمار جونيور",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الجناح الأيسر أو صانع الألعاب.",
      "3. برزت موهبتي في البرازيل وتوجت بكأس ليبرتادوريس مبكراً.",
      "4. أنا صاحب أغلى صفقة انتقال في تاريخ كرة القدم حتى الآن.",
      "5. شكلت ثلاثياً مرعباً في إسبانيا، ولعبت في فرنسا تحت قيادة توخيل وإيمري.",
      "6. أنا الهداف التاريخي لمنتخب البرازيل.",
      "7. أشتهر بالمهارات الفردية الساحرة، ولعبت لبرشلونة وباريس سان جيرمان.",
    ],
  },
  {
    name: "كيليان إمبابي",
    hints: [
      "1. أنا لاعب حالي.",
      "2. ألعب كجناح أيسر أو مهاجم صريح.",
      "3. بدأت مسيرتي في موناكو وحققت معهم لقب الدوري.",
      "4. سجلت (هاتريك) في المباراة النهائية لكأس العالم.",
      "5. لعبت لسنوات في الدوري الفرنسي قبل انتقالي التاريخي الأخير.",
      "6. أنا فرنسي الجنسية، وأعتبر أسرع لاعب في العالم تقريباً.",
      "7. أرتدي القميص رقم 9 حالياً مع ريال مدريد، وألقب بـ (النينجا).",
    ],
  },
  {
    name: "إيرلينغ هالاند",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. والدي كان لاعب كرة قدم محترف في نفس الدوري الذي ألعب فيه الآن.",
      "4. حطمت الرقم القياسي لأكثر عدد من الأهداف في موسم واحد بالبريميرليج.",
      "5. تألقت في ألمانيا مع دورتموند قبل اللعب تحت قيادة جوارديولا.",
      "6. أنا نرويجي الجنسية، وألعب لنادي مانشستر سيتي.",
      "7. أتميز بالقوة الجسدية الخارقة وألقب بـ (الفايكنج) أو (الآلة).",
    ],
  },
  {
    name: "روبرت ليفاندوفسكي",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. كنت قريباً من اللعب في إنجلترا لولا بركان آيسلندا الذي ألغى رحلتي الطيرانية.",
      "4. سجلت 5 أهداف في 9 دقائق فقط في مباراة تاريخية كبديل.",
      "5. حصدت السداسية التاريخية مع فريقي الألماني السابق.",
      "6. أنا القائد والهداف التاريخي لمنتخب بولندا.",
      "7. ألعب حالياً لنادي برشلونة الإسباني وألقب بـ (ليفا).",
    ],
  },
  {
    name: "كريم بنزيما",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. بدأت مسيرتي في فرنسا مع نادي ليون وتألقت هناك بشدة.",
      "4. ابتعدت عن المشاركة الدولية مع منتخبي لسنوات بسبب أزمة شهيرة.",
      "5. فزت بدوري أبطال أوروبا 5 مرات ولعبت تحت قيادة أنشيلوتي وزيدان.",
      "6. أنا فرنسي، وثاني الهدافين التاريخيين لريال مدريد.",
      "7. فزت بالكرة الذهبية 2022، وألعب للاتحاد السعودي، وألقب بـ (الحكومة).",
    ],
  },
  {
    name: "لويس سواريز",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. لعبت في الدوري الهولندي وحققت لقب الهداف هناك.",
      "4. اللاعب الوحيد الذي كسر احتكار ميسي ورونالدو للحذاء الذهبي في عز مجدهم.",
      "5. لعبت في الدوري الإنجليزي وتألقت، ثم حققت ألقاباً كبرى في إسبانيا.",
      "6. أنا أوروجواياني، وشكلت مثلث (MSN) المرعب في برشلونة.",
      "7. أشتهر بحادثة (العض) في كأس العالم، وألقب بـ (البيستوليرو).",
    ],
  },
  {
    name: "تييري هنري",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. لعبت كمهاجم صريح وجناح أيسر.",
      "3. تجربتي الاحترافية في إيطاليا مع يوفنتوس كانت فاشلة تماماً.",
      "4. خسرت نهائي دوري الأبطال مع فريقي اللندني ثم حققته لاحقاً في إسبانيا.",
      "5. كنت النجم الأول لجيل (اللاهزيمة) تحت قيادة أرسين فينجر.",
      "6. أنا فرنسي، والهداف التاريخي لنادي أرسنال الإنجليزي.",
      "7. تم بناء تمثال لي خارج ملعب الإمارات، وأشتهر بالرقم 14.",
    ],
  },
  {
    name: "رونالدينيو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي صانع ألعاب وجناح أيسر.",
      "3. بدأت في نادي جريميو، ومحطتي الأوروبية الأولى كانت في فرنسا.",
      "4. رغم موهبتي الأسطورية، لم أحقق دوري أبطال أوروبا سوى مرة واحدة.",
      "5. توجت بالكرة الذهبية وكأس العالم، ولعبت في إيطاليا لميلان.",
      "6. في ليلة تاريخية، وقفت جماهير ريال مدريد لتصفق لي في البرنابيو.",
      "7. أنا ساحر برازيلي، أشتهر بابتسامتي الدائمة وأسطورة برشلونة رقم 10.",
    ],
  },
  {
    name: "الظاهرة رونالدو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي هو رأس الحربة.",
      "3. بدأت في كروزيرو، وأول فريق أوروبي لي كان أيندهوفن الهولندي.",
      "4. تعرضت لإصابتين قطع في الرباط الصليبي كادتا أن تنهيا مسيرتي.",
      "5. فزت بالكرة الذهبية مرتين ولعبت لقطبي إسبانيا وقطبي مدينة ميلانو.",
      "6. قُدت البرازيل للفوز بكأس العالم 2002 بعد العودة من الإصابة.",
      "7. ألقب بـ (الظاهرة)، وأشتهر بقصة شعري الغريبة في نهائي المونديال.",
    ],
  },
  {
    name: "زين الدين زيدان",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو صانع الألعاب.",
      "3. بدأت مسيرتي مع نادي كان الفرنسي، ولعبت لاحقاً لبوردو.",
      "4. فزت بالكرة الذهبية وكأس العالم في نفس العام (1998).",
      "5. سجلت هدفاً أسطورياً على الطاير في نهائي دوري الأبطال.",
      "6. أنا أسطورة فرنسية، ولعبت ليوفنتوس وريال مدريد.",
      "7. انتهت مسيرتي الكروية بـ (نطحة) شهيرة في نهائي مونديال 2006.",
    ],
  },
  {
    name: "أندريس إنييستا",
    hints: [
      "1. أنا لاعب حالي .",
      "2. مركزي هو صانع ألعاب وخط وسط هجومي.",
      "3. انضممت لأكاديمية لاماسيا وأنا طفل وكنت أبكي من شدة الحنين لعائلتي.",
      "4. حققت كل البطولات الممكنة مع النادي والمنتخب، لكنني لم أفز بالكرة الذهبية.",
      "5. سجلت هدفاً قاتلاً في الدقيقة 93 في ملعب ستامفورد بريدج.",
      "6. أنا إسباني، وشكلت ثنائية تاريخية مع تشافي في برشلونة.",
      "7. سجلت هدف فوز إسبانيا بكأس العالم 2010، وألقب بـ (الرسام).",
    ],
  },
  {
    name: "لوكا مودريتش",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي خط وسط (صانع ألعاب متأخر).",
      "3. في طفولتي كنت لاجئاً وعانيت من ويلات الحرب في بلادي.",
      "4. تألقت في إنجلترا مع توتنهام لكنني لم أفز ببطولات كبرى هناك.",
      "5. أنا أول من كسر احتكار ميسي ورونالدو وحققت الكرة الذهبية في 2018.",
      "6. حققت دوري أبطال أوروبا 6 مرات وأنا قائد منتخب كرواتيا.",
      "7. أرتدي القميص رقم 10 في ريال مدريد وأشتهر بالتمرير بوجه القدم الخارجي.",
    ],
  },
  {
    name: "توني كروس",
    hints: [
      "1. أنا لاعب معتزل .",
      "2. مركزي الأساسي هو خط الوسط (ضابط إيقاع).",
      "3. لعبت معاراً لنادي باير ليفركوزن في بداية مسيرتي لإثبات نفسي.",
      "4. نسبة دقة تمريراتي نادراً ما تنزل عن 90% طوال مسيرتي.",
      "5. حصدت كأس العالم 2014، وفزت بدوري الأبطال 6 مرات.",
      "6. أنا ألماني، ولعبت لبايرن ميونخ قبل الانتقال لإسبانيا.",
      "7. أسطورة ريال مدريد في خط الوسط، واعتزلت بعد يورو 2024.",
    ],
  },
  {
    name: "محمد صلاح",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الجناح الأيمن.",
      "3. بدأت مسيرتي الأوروبية في الدوري السويسري مع بازل.",
      "4. تجربتي الأولى في إنجلترا كانت محبطة، لكنني عدت لأحطم الأرقام القياسية.",
      "5. فزت بدوري الأبطال والدوري الإنجليزي تحت قيادة يورجن كلوب.",
      "6. أنا مصري، والهداف التاريخي لفريقي في الدوري الإنجليزي.",
      "7. ألعب لليفربول وأرتدي الرقم 11، وألقب بـ (فخر العرب) و(الملك).",
    ],
  },
  {
    name: "ساديو ماني",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الجناح الأيسر.",
      "3. بدأت في ميتز الفرنسي، ثم تألقت في النمسا وإنجلترا.",
      "4. سجلت أسرع (هاتريك) في تاريخ الدوري الإنجليزي الممتاز.",
      "5. فزت بدوري الأبطال ولعبت في بايرن ميونخ لفترة قصيرة.",
      "6. قُدت منتخب السنغال للفوز بأول كأس أمم أفريقيا في تاريخه.",
      "7. ألعب حالياً لنادي النصر السعودي وزاملت محمد صلاح لسنوات في ليفربول.",
    ],
  },
  {
    name: "رياض محرز",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الجناح الأيمن.",
      "3. بدأت مسيرتي في أندية درجات سفلى في فرنسا (لوهافر).",
      "4. فزت بجائزة أفضل لاعب في إنجلترا وكنت جزءاً من معجزة كروية كبرى.",
      "5. حصدت الدوري الإنجليزي عدة مرات تحت قيادة جوارديولا ورانييري.",
      "6. قُدت منتخب بلادي الجزائر للفوز بكأس أمم أفريقيا 2019.",
      "7. لعبت لليستر سيتي ومانشستر سيتي، وألعب حالياً للأهلي السعودي.",
    ],
  },
  {
    name: "أشرف حكيمي",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الظهير الأيمن.",
      "3. نشأت في أكاديمية ريال مدريد (الكاستيا) وصعدت للفريق الأول مبكراً.",
      "4. رغم صغر سني، لعبت في أقوى دوريات العالم (إسبانيا، ألمانيا، إيطاليا، فرنسا).",
      "5. حققت الدوري الإيطالي مع كونتي، وتألقت بشكل لافت في مونديال 2022.",
      "6. أنا لاعب مغربي، وأعتبر من أسرع اللاعبين في العالم.",
      "7. ألعب حالياً لنادي باريس سان جيرمان، وأرتدي القميص رقم 2.",
    ],
  },
  {
    name: "ياسين بونو",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو حارس المرمى.",
      "3. بدأت في الوداد المغربي، وانتقلت لإسبانيا لألعب مع رديف أتلتيكو مدريد.",
      "4. فزت بجائزة (زامورا) كأفضل حارس في الدوري الإسباني.",
      "5. تألقت وتصديت لركلات ترجيح حاسمة قادت بلادي لنصف نهائي المونديال.",
      "6. أنا مغربي، وحققت الدوري الأوروبي (اليوروباليج) مرتين.",
      "7. لعبت لإشبيلية الإسباني، وألعب حالياً لنادي الهلال السعودي.",
    ],
  },
  {
    name: "تيبو كورتوا",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو حارس المرمى.",
      "3. بدأت في جينك البلجيكي وانتقلت لتشيلسي الذي أعارني فوراً.",
      "4. حصدت جائزة رجل المباراة في نهائي دوري أبطال أوروبا 2022 بتصديات إعجازية.",
      "5. فزت بالدوري الإسباني مع قطبي العاصمة (أتلتيكو وريال).",
      "6. أنا الحارس الأساسي لمنتخب بلجيكا.",
      "7. ألعب حالياً لريال مدريد، وأتميز بطولي الفارع جداً.",
    ],
  },
  {
    name: "مانويل نوير",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو حارس المرمى.",
      "3. بدأت مسيرتي وتألقت مع نادي شالكه قبل الانتقال الكبير.",
      "4. أعدت تعريف مركزي وأصبحت أُلعب كـ (ليبرو) خلف المدافعين.",
      "5. حصدت السداسية التاريخية مرتين مع فريقي الألماني.",
      "6. فزت بكأس العالم 2014 وأنا القائد التاريخي لبايرن ميونخ.",
      "7. أنا ألماني الجنسية، وأعتبر أحد أعظم الحراس في تاريخ كرة القدم.",
    ],
  },
  {
    name: "جانلويجي بوفون",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو حارس المرمى.",
      "3. بدأت مسيرتي مع بارما وحققت معهم كأس الاتحاد الأوروبي.",
      "4. بقيت وفياً لفريقي وهبطت معهم للدرجة الثانية رغم كوني بطل عالم.",
      "5. لعبت أكثر من 1000 مباراة، ورغم ذلك لم أفز بدوري أبطال أوروبا أبداً.",
      "6. أنا إيطالي، وحققت كأس العالم 2006.",
      "7. أنا الأسطورة التاريخية لنادي يوفنتوس الإيطالي، وألقب بـ (جيجي).",
    ],
  },
  {
    name: "إيكر كاسياس",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو حارس المرمى.",
      "3. صعدت للفريق الأول لنادي العاصمة وأنا مراهق، وتوجت بالأبطال مبكراً.",
      "4. قمت بتصدي أسطوري لانفراد روبن في نهائي كأس العالم.",
      "5. رحلت عن فريقي التاريخي وانتقلت للدوري البرتغالي قبل اعتزالي بسبب أزمة قلبية.",
      "6. أنا القائد التاريخي لمنتخب إسبانيا.",
      "7. أنا أسطورة ريال مدريد وألقب بـ (القديس).",
    ],
  },
  {
    name: "سيرخيو راموس",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي قلب دفاع (وبدأت مسيرتي كظهير أيمن).",
      "3. نشأت في نادي إشبيلية وانتقلت لفريق العاصمة بمبلغ كبير لمدافع شاب.",
      "4. أنا أكثر لاعب حصولاً على البطاقات الحمراء في تاريخ الدوري الإسباني.",
      "5. سجلت هدفاً رأسياً قاتلاً في الدقيقة 93 قاد فريقي للقب (العاشرة).",
      "6. حققت كأس العالم، وأنا القائد التاريخي لريال مدريد.",
      "7. أنا إسباني، ولعبت لباريس سان جيرمان وإشبيلية مؤخراً.",
    ],
  },
  {
    name: "بيبي",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو قلب الدفاع.",
      "3. ولدت في البرازيل لكنني اخترت تمثيل منتخب أوروبي.",
      "4. أشتهر بالشراسة والتدخلات العنيفة، وتلقيت إيقافاً طويلاً بسبب حادثة شهيرة.",
      "5. شكلت ثنائية دفاعية مرعبة في ريال مدريد وتوجت بـ 3 دوري أبطال.",
      "6. قُدت دفاع منتخبي للفوز بيورو 2016.",
      "7. أنا برتغالي، ولعبت لبورتو، واسمي الحقيقي (كيبلير لافيران).",
    ],
  },
  {
    name: "جيرارد بيكيه",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو قلب الدفاع.",
      "3. غادرت إسبانيا وأنا شاب للعب في مانشستر يونايتد وحققت معهم الأبطال.",
      "4. عدت لفريق طفولتي وكنت ركيزة أساسية في جيل السداسية الذهبي.",
      "5. أشتهر بتصريحاتي الجدلية ضد الغريم التقليدي (ريال مدريد).",
      "6. حققت كأس العالم وكأس أمم أوروبا مع منتخب إسبانيا.",
      "7. أنا أسطورة دفاع برشلونة، وارتبط اسمي طويلاً بالمغنية شاكيرا.",
    ],
  },
  {
    name: "كارليس بويول",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي قلب دفاع (ولعبت كظهير أحياناً).",
      "3. بدأت وتدرجت واعتزلت في نادٍ واحد فقط (لاعب الفريق الواحد).",
      "4. سجلت هدفاً رأسياً حاسماً لمنتخب بلادي في نصف نهائي مونديال 2010.",
      "5. أشتهر بالروح القتالية العالية واللعب النظيف جداً والقيادة المطلقة.",
      "6. أنا إسباني، والقائد التاريخي لجيل السداسية في برشلونة.",
      "7. ألقب بـ (قلب الأسد)، وأشتهر بشعري الطويل الكثيف.",
    ],
  },
  {
    name: "فيرجيل فان دايك",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو قلب الدفاع.",
      "3. بدأت في جرونينجن وانتقلت لسلتيك الاسكتلندي قبل اللعب في البريميرليج.",
      "4. أكملت موسماً كاملاً في الدوري الإنجليزي دون أن ينجح أي لاعب في مراوغتي.",
      "5. انتقلت لفريقي الحالي بصفقة قياسية لمدافع وحققت معهم دوري الأبطال.",
      "6. أنا هولندي الجنسية، والقائد الحالي لنادي ليفربول.",
      "7. أرتدي القميص رقم 4 وأشتهر بالهدوء التام في استخلاص الكرة.",
    ],
  },
  {
    name: "داني ألفيش",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو الظهير الأيمن.",
      "3. تألقت في إسبانيا مع نادي إشبيلية قبل الانتقال الأكبر في مسيرتي.",
      "4. أنا واحد من أكثر اللاعبين تتويجاً بالبطولات الرسمية في تاريخ كرة القدم.",
      "5. لعبت ليوفنتوس وباريس سان جيرمان، وكنت شريكاً ذهبياً لميسي.",
      "6. أنا برازيلي، وأسطورة الجبهة اليمنى في برشلونة.",
      "7. أنهيت مسيرتي بأزمة قانونية شهيرة وسجن في إسبانيا.",
    ],
  },
  {
    name: "روبرتو كارلوس",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو الظهير الأيسر.",
      "3. لعبت في إيطاليا مع إنتر ميلان لفترة قصيرة قبل الانتقال لإسبانيا.",
      "4. سجلت هدفاً من ركلة حرة ضد فرنسا تحدى قوانين الفيزياء بانحرافه.",
      "5. كنت جزءاً أساسياً من جيل (الجلاكتيكوس) الأول.",
      "6. توجت بكأس العالم 2002، وأنا برازيلي الجنسية.",
      "7. أسطورة ريال مدريد وأمتلك أضخم وأقوى قدم يسرى تسديداً للكرة.",
    ],
  },
  {
    name: "مارسيلو",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الظهير الأيسر.",
      "3. بدأت مسيرتي في نادي فلومينينسي البرازيلي وعدت إليه مؤخراً وحققت ليبرتادوريس.",
      "4. أنا اللاعب الأكثر تتويجاً بالبطولات في تاريخ نادي ريال مدريد (مناصفة).",
      "5. كنت شريكاً استثنائياً لكريستيانو رونالدو في الجبهة اليسرى.",
      "6. حققت 5 ألقاب دوري أبطال أوروبا، وأنا برازيلي الجنسية.",
      "7. أتميز بمهارة تفوق المهاجمين، وأشتهر بشعري (الكيرلي) الكثيف.",
    ],
  },
  {
    name: "نغولو كانتي",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي خط وسط ارتكاز (دفاعي).",
      "3. بدأت في أندية مغمورة في فرنسا مثل بولوني وكاين.",
      "4. حققت لقب الدوري الإنجليزي في موسمين متتاليين مع فريقين مختلفين.",
      "5. فزت بجائزة رجل المباراة في نصف نهائي ونهائي دوري أبطال أوروبا 2021.",
      "6. توجت بكأس العالم 2018، وأنا فرنسي الجنسية.",
      "7. أشتهر بالتواضع الشديد والابتسامة، ويُقال أنني (أغطي 30% من مساحة الأرض).",
    ],
  },
  {
    name: "كاسيميرو",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي خط وسط ارتكاز (دفاعي).",
      "3. لعبت معاراً لنادي بورتو البرتغالي لاكتساب الخبرة ثم عدت بقوة.",
      "4. شكلت مثلث رعب تاريخي في خط الوسط حصد 4 ألقاب دوري أبطال أوروبا.",
      "5. أتميز بالتدخلات القوية والضربات الرأسية في المباريات الكبرى.",
      "6. أنا برازيلي الجنسية، وانتقلت مؤخراً للدوري الإنجليزي.",
      "7. أسطورة وسط ريال مدريد، وألعب حالياً لمانشستر يونايتد.",
    ],
  },
  {
    name: "أندريا بيرلو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي خط وسط (مايسترو متأخر).",
      "3. بدأت في بريشيا، ولعبت لإنتر ميلان قبل أن أتألق مع غريمهم.",
      "4. لعبت لأكبر 3 أندية في إيطاليا (الإنتر، ميلان، يوفنتوس).",
      "5. توجت بكأس العالم 2006 وحصلت على رجل المباراة في النهائي.",
      "6. أنا إيطالي، وأتميز بالهدوء القاتل وتنفيذ الركلات الحرة المتقنة.",
      "7. ألقب بـ (المايسترو) وأشتهر بتسجيل ركلة جزاء (بانينكا) ضد إنجلترا.",
    ],
  },
  {
    name: "ستيفن جيرارد",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي خط وسط (محور هجومي ودفاعي).",
      "3. قضيت كل مسيرتي الأوروبية تقريباً في نادٍ واحد فقط.",
      "4. لم أتمكن أبداً من الفوز بلقب الدوري الإنجليزي الممتاز (البريميرليج).",
      "5. قُدت فريقي لعودة تاريخية (ريمونتادا) في نهائي أبطال أوروبا بإسطنبول.",
      "6. أنا إنجليزي الجنسية، والقائد التاريخي لنادي ليفربول.",
      "7. أرتدي الرقم 8، وأشتهر بـ (الانزلاق) الشهير ضد تشيلسي.",
    ],
  },
  {
    name: "فرانك لامبارد",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي خط وسط هجومي (بوكس تو بوكس).",
      "3. نشأت في أكاديمية وست هام يونايتد قبل انتقالي التاريخي في لندن.",
      "4. رغم مركزي كلاعب وسط، أنا الهداف التاريخي للنادي الذي لعبت له.",
      "5. لعبت في نهاية مسيرتي لموسم واحد مع مانشستر سيتي وسجلت ضد فريقي السابق.",
      "6. فزت بدوري الأبطال 2012، وأنا إنجليزي الجنسية.",
      "7. أنا أسطورة نادي تشيلسي الإنجليزي وأرتدي الرقم 8.",
    ],
  },
  {
    name: "سيسك فابريغاس",
    hints: [
      "1. أنا لاعب معتزل ً .",
      "2. مركزي الأساسي خط وسط (صانع ألعاب).",
      "3. غادرت أكاديمية لاماسيا صغيراً لأتألق وأصبح أصغر قائد في تاريخ فريقي الإنجليزي.",
      "4. أنا من قدم التمريرة الحاسمة (الأسيست) لهدف فوز إسبانيا بكأس العالم 2010.",
      "5. عدت لبرشلونة، ثم انتقلت لاحقاً للغريم اللندني لفريقي الأول وحققت البريميرليج.",
      "6. أنا إسباني، وأعتبر من أعظم صناع اللعب في تاريخ الدوري الإنجليزي.",
      "7. تألقت بقميص أرسنال وتشيلسي، وأرتدي دائماً الرقم 4.",
    ],
  },
  {
    name: "ديفيد بيكهام",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي خط وسط وجناح أيمن.",
      "3. سجلت هدفاً أسطورياً من منتصف الملعب في بداياتي بالدوري الإنجليزي.",
      "4. حققت الثلاثية التاريخية في 1999، لكنني لم أفز بكأس العالم.",
      "5. كنت أيقونة الجيل الأول للـ (جلاكتيكوس) بعد انتقالي لإسبانيا.",
      "6. لعبت لميلان وباريس والجابالا، وأنا إنجليزي الجنسية.",
      "7. أسطورة لمانشستر يونايتد، أرتدي الرقم 7، وأشتهر بتسريحات الشعر والركلات الحرة.",
    ],
  },
  {
    name: "سيرجيو بوسكيتس",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي خط وسط ارتكاز (دفاعي).",
      "3. صعدني جوارديولا من الفريق الرديف ووثق بي على حساب نجم كبير (يايا توريه).",
      "4. حققت كل البطولات الممكنة (سداسية، كأس عالم، يورو) بفضل ذكائي التكتيكي وليس سرعتي.",
      "5. شكلت مع تشافي وإنييستا أقوى خط وسط في التاريخ الحديث.",
      "6. أنا إسباني، ولعبت لبرشلونة طوال مسيرتي في أوروبا.",
      "7. ألعب حالياً في إنتر ميامي مع ميسي، وأرتدي الرقم 5.",
    ],
  },
  {
    name: "ريكاردو كاكا",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي صانع ألعاب.",
      "3. تعرضت لحادث في طفولتي كاد أن يصيبني بالشلل لكنني تعافيت بأعجوبة.",
      "4. أنا آخر لاعب فاز بالكرة الذهبية قبل أن تبدأ هيمنة ميسي ورونالدو.",
      "5. انتقلت لريال مدريد في نفس صيف انتقال كريستيانو، لكن الإصابات دمرت مسيرتي هناك.",
      "6. توجت بكأس العالم 2002، وأنا برازيلي الجنسية.",
      "7. أنا أسطورة ميلان الإيطالي، وأشتهر بالاحتفال برفع يدي للسماء.",
    ],
  },
  {
    name: "واين روني",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي مهاجم صريح وصانع ألعاب.",
      "3. سجلت هدفاً مذهلاً ضد أرسنال وأنا بعمر 16 عاماً فقط مع إيفرتون.",
      "4. سجلت (هاتريك) في أول مباراة لي في دوري أبطال أوروبا.",
      "5. أنا الهداف التاريخي لنادي مانشستر يونايتد الإنجليزي.",
      "6. أنا إنجليزي الجنسية، وسجلت هدفاً مقصياً أيقونياً ضد مانشستر سيتي.",
      "7. ألقب بـ (الفتى الذهبي) وارتديت الرقم 10 لسنوات طويلة.",
    ],
  },
  {
    name: "ديدييه دروغبا",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. تأخرت انطلاقتي الاحترافية الكبيرة حتى سن الـ 24 في فرنسا.",
      "4. أوقفت خطاباتي بعد مباراة كرة قدم حرباً أهلية في بلدي.",
      "5. سجلت هدف التعادل القاتل ثم الركلة الحاسمة في نهائي دوري أبطال أوروبا 2012.",
      "6. أنا إيفواري (من ساحل العاج).",
      "7. أنا الأسطورة الأكبر لهجوم نادي تشيلسي الإنجليزي، وأرتدي الرقم 11.",
    ],
  },
  {
    name: "صامويل إيتو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. كنت لاعباً في أكاديمية ريال مدريد لكنهم فرطوا في عقدي مبكراً.",
      "4. تألقت مع ريال مايوركا قبل أن أصبح من أفضل المهاجمين في العالم.",
      "5. اللاعب الوحيد الذي حقق (الثلاثية التاريخية) موسمين متتاليين مع فريقين مختلفين.",
      "6. أنا كاميروني الجنسية، وبطل أفريقيا عدة مرات.",
      "7. أسطورة هجوم برشلونة وإنتر ميلان، وألقب بـ (الأسد الكاميروني).",
    ],
  },
  {
    name: "باولو ديبالا",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي مهاجم متأخر أو صانع ألعاب.",
      "3. بدأت في إنيستتوتو الأرجنتيني، وتألقت في إيطاليا أولاً مع باليرمو.",
      "4. توجت بكأس العالم 2022 وشاركت وسجلت في ركلات الترجيح بالنهائي.",
      "5. لعبت لسنوات بالرقم 10 مع يوفنتوس الإيطالي قبل الرحيل مجاناً.",
      "6. أنا أرجنتيني، وألعب حالياً لنادي روما الإيطالي.",
      "7. أشتهر باحتفال (القناع) بيدي على وجهي، وألقب بـ (الجوهرة).",
    ],
  },
  {
    name: "أنطوان جريزمان",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي مهاجم متأخر، جناح، وأحياناً صانع ألعاب.",
      "3. رفضتني الأندية في بلدي لصغر حجمي، فتبناني نادي ريال سوسيداد الإسباني.",
      "4. خسرت نهائي دوري الأبطال ونهائي اليورو في نفس العام (2016).",
      "5. توجت بكأس العالم 2018 وسجلت في المباراة النهائية.",
      "6. لعبت لبرشلونة فترة غير ناجحة ثم عدت لفريقي الذي أنا هدافه التاريخي.",
      "7. أنا فرنسي الجنسية، وأسطورة نادي أتلتيكو مدريد، وأرتدي الرقم 7.",
    ],
  },
  {
    name: "جاريث بيل",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي جناح أيمن (وبدأت كظهير أيسر).",
      "3. تألقت في إنجلترا وسجلت (هاتريك) شهير ضد إنتر ميلان في دوري الأبطال.",
      "4. انتقلت لإسبانيا في صفقة حطمت الرقم القياسي العالمي وقتها.",
      "5. سجلت هدف هروب شهير من مارك بارترا في نهائي الكأس.",
      "6. سجلت هدفاً مقصياً مذهلاً في نهائي دوري الأبطال 2018.",
      "7. أنا ويلزي، لعبت لريال مدريد، وأشتهر بحبي الشديد لـ (الجولف).",
    ],
  },
  {
    name: "أرين روبن",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو الجناح الأيمن.",
      "3. لعبت لتشيلسي وريال مدريد لكنني طُردت من إسبانيا مع قدوم بيريز.",
      "4. خسرت نهائي كأس العالم ونهائي دوري أبطال أوروبا.",
      "5. سجلت هدف الفوز القاتل في نهائي دوري أبطال أوروبا 2013 ليحقق فريقي الثلاثية.",
      "6. شكلت ثنائية مرعبة سُميت بـ (الروبيري).",
      "7. أنا هولندي، أسطورة بايرن ميونخ، وأشتهر بـ (الدخول للعمق والتسديد باليسرى).",
    ],
  },
  {
    name: "فرانك ريبيري",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو الجناح الأيسر.",
      "3. بدأت في أندية مغمورة وعانيت قبل التألق مع جلطة سراي ومارسيليا.",
      "4. خسرت نهائي كأس العالم 2006 مع بلادي.",
      "5. حققت الثلاثية التاريخية وكنت الأحق بالكرة الذهبية 2013 حسب رأي الكثيرين.",
      "6. أنا فرنسي، وأسطورة الجناح الأيسر في بايرن ميونخ.",
      "7. أشتهر بندبة واضحة في وجهي بسبب حادث سيارة في طفولتي.",
    ],
  },
  {
    name: "توماس مولر",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي مهاجم وهمي أو صانع ألعاب أو جناح.",
      "3. أنا (لاعب النادي الواحد) لم ألعب لأي فريق آخر في مسيرتي الاحترافية.",
      "4. فزت بالحذاء الذهبي لكأس العالم 2010 وأنا في سن الـ 20.",
      "5. حققت الثلاثية التاريخية مرتين مع بايرن ميونخ.",
      "6. توجت بكأس العالم 2014، وسجلت في شباك البرازيل في مباراة الـ 7-1.",
      "7. أنا ألماني، ألقب بـ (مكتشف المساحات)، وأرتدي الرقم 25.",
    ],
  },
  {
    name: "فينيسيوس جونيور",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الجناح الأيسر.",
      "3. انتقلت من فلامنجو إلى إسبانيا بمبلغ ضخم وأنا مراهق لم أتجاوز 18 عاماً.",
      "4. عانيت من السخرية في بداياتي لدرجة أن زميلاً لي طلب عدم التمرير لي.",
      "5. سجلت هدف الفوز في نهائي دوري أبطال أوروبا 2022.",
      "6. سجلت في نهائي دوري أبطال أوروبا 2024 وحققت اللقب مجدداً.",
      "7. أنا برازيلي، النجم الأول لريال مدريد حالياً، وأرتدي الرقم 7.",
    ],
  },
  {
    name: "جود بيلينجهام",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي خط وسط، بوكس تو بوكس، وصانع ألعاب.",
      "3. بدأت مسيرتي في برمنغهام سيتي وقام النادي بحجب رقمي (22) بعد رحيلي.",
      "4. تألقت في ألمانيا مع بروسيا دورتموند وكنت قائداً لهم في سن صغيرة.",
      "5. في موسمي الأول في إسبانيا، سجلت أهدافاً حاسمة في مباراتي الكلاسيكو.",
      "6. حققت دوري أبطال أوروبا وفزت بجائزة الفتى الذهبي.",
      "7. أنا إنجليزي الجنسية، النجم الجديد لريال مدريد، وأرتدي الرقم 5 واحتفالي بفتح ذراعي.",
    ],
  },
  {
    name: "رودري",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو خط الوسط الدفاعي (ارتكاز).",
      "3. بدأت وتألقت مع فياريال، ثم انتقلت لأتلتيكو مدريد لموسم واحد فقط.",
      "4. سجلت هدف الفوز الوحيد في نهائي دوري أبطال أوروبا 2023.",
      "5. توجت بجائزة أفضل لاعب في بطولة يورو 2024.",
      "6. أنا إسباني الجنسية، ولا أملك أي حسابات على السوشيال ميديا.",
      "7. ألعب لمانشستر سيتي الإنجليزي، وأعتبر أهم ركيزة في خطة جوارديولا حالياً.",
    ],
  },
  {
    name: "لامين يامال",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الجناح الأيمن.",
      "3. نشأت في أكاديمية لاماسيا وتدرجت بسرعة خارقة.",
      "4. حطمت كل الأرقام القياسية كأصغر لاعب يشارك ويسجل في تاريخ الدوري الإسباني.",
      "5. سجلت هدفاً إعجازياً ضد فرنسا في نصف نهائي يورو 2024.",
      "6. توجت باليورو وأنا لم أتجاوز الـ 17 عاماً.",
      "7. أنا إسباني (من أصول مغربية)، وألعب لنادي برشلونة بالرقم 19.",
    ],
  },
  {
    name: "أنخيل دي ماريا",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الجناح الأيمن أو الأيسر.",
      "3. تألقت في بنفيكا قبل أن أنتقل لعملاق إسباني وأساهم في تحقيق لقب الأبطال (العاشرة).",
      "4. تجربتي في إنجلترا مع مانشستر يونايتد كانت سيئة جداً ورقم 7 كان لعنة علي.",
      "5. أنا (رجل النهائيات)، سجلت في نهائي الأولمبياد، نهائي الكوبا، ونهائي كأس العالم.",
      "6. لعبت لباريس سان جيرمان ويوفنتوس.",
      "7. أنا أرجنتيني، رفيق ميسي، وأشتهر باحتفال (القلب) بيدي.",
    ],
  },
  {
    name: "سون هيونج مين",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي جناح أيسر ومهاجم.",
      "3. بدأت مسيرتي الأوروبية في ألمانيا مع هامبورج وباير ليفركوزن.",
      "4. فزت بجائزة الحذاء الذهبي (هداف البريميرليج) مناصفة مع محمد صلاح.",
      "5. فزت بجائزة بوشكاش لأفضل هدف بعد انطلاقة ماراثونية من منطقة جزائي.",
      "6. شكلت ثنائية تاريخية مع هاري كين، ولم أحقق أي بطولة رسمية مع فريقي الإنجليزي.",
      "7. أنا كوري جنوبي، والقائد الحالي لنادي توتنهام هوتسبير.",
    ],
  },
  {
    name: "خفيتشا كفاراتسخيليا",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو الجناح الأيسر.",
      "3. لعبت في الدوري الروسي، وغادرت بسبب الحرب لأعود لبلدي ثم انتقلت لإيطاليا.",
      "4. في موسمي الأول، قُدت فريقي للفوز بالدوري الإيطالي بعد غياب أكثر من 30 عاماً.",
      "5. شكلت ثنائية هجومية مرعبة مع النيجيري فيكتور أوسيمين.",
      "6. أنا من دولة جورجيا وقُدت منتخبي لإنجاز تاريخي في يورو 2024.",
      "7. ألعب لنادي نابولي الإيطالي، وتلقبني الجماهير بـ (كفارادونا).",
    ],
  },
  {
    name: "فيكتور أوسيمين",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. تألقت في فرنسا مع ليل قبل الانتقال بصفقة ضخمة إلى إيطاليا.",
      "4. فزت بجائزة هداف الدوري الإيطالي (الكالتشيو) في موسم التتويج التاريخي.",
      "5. توجت بجائزة أفضل لاعب أفريقي في عام 2023.",
      "6. أنا نيجيري الجنسية، وألعب لنادي نابولي الإيطالي.",
      "7. أشتهر بارتداء (قناع واقي) على وجهي في كل المباريات بعد إصابة خطيرة.",
    ],
  },
  {
    name: "دييغو مارادونا",
    hints: [
      "1. أنا لاعب معتزل (ورحلت عن عالمكم).",
      "2. مركزي الأساسي صانع ألعاب ومهاجم متأخر.",
      "3. بدأت في أرجنتينوس جونيورز قبل انتقالي للنادي الذي أحبه (بوكا جونيورز).",
      "4. لعبت في إسبانيا، لكن مجدي الأكبر كان في جنوب إيطاليا حيث أصبحت كالإله هناك.",
      "5. قُدت فريقاً نابوليتانياً لكسر هيمنة أندية الشمال والفوز بالدوري الإيطالي.",
      "6. سجلت هدفين تاريخيين في مباراة واحدة بكأس العالم (أحدهما بيدي والآخر راوغت فيه نصف الفريق).",
      "7. أنا أرجنتيني، أرتدي الرقم 10، وألقب بـ (الفتى الذهبي).",
    ],
  },
  {
    name: "بيليه",
    hints: [
      "1. أنا لاعب معتزل (ورحلت عن عالمكم).",
      "2. مركزي الأساسي مهاجم وصانع ألعاب.",
      "3. لم ألعب لأي نادي أوروبي طوال مسيرتي الاحترافية.",
      "4. سجلت أكثر من 1000 هدف في مسيرتي (رغم الجدل حول الرقم الرسمي).",
      "5. احترفت في نهاية مسيرتي في الدوري الأمريكي مع فريق نيويورك كอزموس.",
      "6. أنا اللاعب الوحيد في تاريخ كرة القدم الذي توج بكأس العالم 3 مرات.",
      "7. أنا أسطورة البرازيل ونادي سانتوس، وألقب بـ (الجوهرة السوداء) أو ملك كرة القدم.",
    ],
  },
  {
    name: "تشافي هيرنانديز",
    hints: [
      "1. أنا لاعب معتزل (ومدرب حالي).",
      "2. مركزي الأساسي هو خط الوسط (ضابط إيقاع وصانع لعب).",
      "3. كدت أغادر فريقي الأم في بداياتي بسبب كثرة الانتقادات والضغط الجماهيري.",
      "4. فزت بكأس العالم وبطولتي أمم أوروبا متتاليتين مع منتخب بلادي.",
      "5. كنت العقل المدبر والمحرك الأساسي لأسلوب (التيكي تاكا) تحت قيادة جوارديولا.",
      "6. أنا إسباني، والأسطورة الخالدة لخط وسط نادي برشلونة.",
      "7. أرتدي القميص رقم 6، وألقب بـ (المايسترو زرقاء اليمامة).",
    ],
  },
  {
    name: "يوهان كرويف",
    hints: [
      "1. أنا لاعب معتزل .",
      "2. مركزي الأساسي مهاجم وصانع ألعاب (لاعب شامل).",
      "3. فزت بالكرة الذهبية 3 مرات في مسيرتي كلاعب.",
      "4. خسرت نهائي كأس العالم رغم أن فريقي قدم أفضل كرة قدم في البطولة.",
      "5. أسست فلسفة كروية كاملة كلاعب ثم كمدرب تعتمد على الاستحواذ والتمرير.",
      "6. أنا هولندي، وأسطورة أياكس أمستردام.",
      "7. ارتديت الرقم 14، وأعتبر الأب الروحي لأسلوب لعب نادي برشلونة الإسباني.",
    ],
  },
  {
    name: "ماركو فان باستن",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. أجبرتني إصابة لعينة في الكاحل على الاعتزال المبكر وأنا في سن الـ 28 فقط.",
      "4. رغم مسيرتي القصيرة، فزت بالكرة الذهبية 3 مرات.",
      "5. سجلت هدفاً أسطورياً على الطاير (من زاوية شبه مستحيلة) في نهائي اليورو.",
      "6. قُدت منتخب بلادي لبطولتهم القارية الوحيدة عام 1988.",
      "7. أنا هولندي، وأسطورة هجوم نادي ميلان الإيطالي وأياكس.",
    ],
  },
  {
    name: "لويس فيغو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو الجناح الأيمن.",
      "3. تألقت في سبورتينج لشبونة قبل أن أصبح النجم الأول في إسبانيا.",
      "4. فزت بالكرة الذهبية، لكنني خسرت نهائي يورو 2004 على أرضي.",
      "5. انتقالي بين الغريمين الإسبانيين أحدث أكبر ضجة في تاريخ سوق الانتقالات.",
      "6. رمى علي الجمهور (رأس خنزير) أثناء تنفيذي لضربة ركنية في الكلاسيكو.",
      "7. أنا برتغالي، وأرتدي الرقم 10، ولعبت لبرشلونة وريال مدريد وإنتر ميلان.",
    ],
  },
  {
    name: "ريفالدو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي صانع ألعاب ومهاجم متأخر.",
      "3. نشأت في فقر مدقع لدرجة تساقط بعض أسناني في طفولتي بسبب سوء التغذية.",
      "4. سجلت هدفاً مقصياً أسطورياً من خارج منطقة الجزاء في الدقيقة 90 ضد فالنسيا.",
      "5. فزت بالكرة الذهبية وكأس العالم، ولعبت في إيطاليا واليونان بعد إسبانيا.",
      "6. شكلت ثنائياً هجومياً مرعباً مع رونالدو الظاهرة في مونديال 2002.",
      "7. أنا برازيلي، وأسطورة نادي برشلونة بالقدم اليسرى الساحرة.",
    ],
  },
  {
    name: "ديفيد فيا",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو رأس الحربة والجناح الأيسر.",
      "3. بدأت في سبورتينج خيخون، ثم تألقت بشدة مع ريال سرقسطة.",
      "4. كدت أفقد ساقي في طفولتي بسبب كسر مضاعف، لكن والدي دربني على التسديد بقدمي الأخرى.",
      "5. حققت لقب الهداف (الحذاء الذهبي) في يورو 2008.",
      "6. سجلت هدفاً رائعاً في نهائي دوري أبطال أوروبا 2011 ضد مانشستر يونايتد.",
      "7. أنا إسباني، والهداف التاريخي لمنتخب (اللاروخا)، وأسطورة فالنسيا وبرشلونة.",
    ],
  },
  {
    name: "أندري شيفتشينكو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. بدأت وتألقت مع دينامو كييف ودمرت دفاعات كبار أوروبا وأنا شاب.",
      "4. حققت الكرة الذهبية، وسجلت ركلة الجزاء الحاسمة التي منحت فريقي دوري الأبطال.",
      "5. في نهائي أبطال آخر، أهدرت الركلة الحاسمة وتصدى لي حارس بطريقة إعجازية (دوديك).",
      "6. تجربتي في إنجلترا مع تشيلسي لم تكن ناجحة رغم قيمتي الهجومية.",
      "7. أنا أوكراني الجنسية، وأسطورة هجوم نادي ميلان الإيطالي، وألقب بـ (الكونكورد).",
    ],
  },
  {
    name: "روماريو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. لعبت لآيندهوفن الهولندي وحققت أرقاماً تهديفية خيالية قبل الذهاب لإسبانيا.",
      "4. توعدت بتسجيل 30 هدفاً في موسمي الأول بالدوري الإسباني ووفيت بوعدي تماماً.",
      "5. أشتهر بتصريحاتي الاستفزازية وسهري الدائم، ومع ذلك كنت حاسماً أمام المرمى.",
      "6. قُدت البرازيل للفوز بكأس العالم 1994 وحصلت على جائزة أفضل لاعب في البطولة.",
      "7. ألقب بـ (ابن فافيلا)، ولعبت لبرشلونة، وأتميز بتسديداتي بـ (وجه القدم الخارجي).",
    ],
  },
  {
    name: "غابرييل باتيستوتا",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو رأس الحربة.",
      "3. بدأت مسيرتي متأخراً لأنني كنت أفضل لعب كرة السلة في طفولتي.",
      "4. لعبت في الأرجنتين لنيولز أولد بويز وريفر بليت وبوكا جونيورز.",
      "5. هبطت مع فريقي الإيطالي للدرجة الثانية وبقيت معهم لإنقاذهم.",
      "6. حققت الدوري الإيطالي أخيراً في أواخر مسيرتي مع نادي روما.",
      "7. أنا أرجنتيني، والأسطورة الخالدة لنادي فيورنتينا، وألقب بـ (باتي جول).",
    ],
  },
  {
    name: "فرانشيسكو توتي",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي مهاجم متأخر وصانع ألعاب.",
      "3. رفضت عرضاً تاريخياً للعب في ريال مدريد واخترت البقاء في فريقي الأم.",
      "4. حققت لقب الدوري الإيطالي مرة واحدة فقط، وفزت بالحذاء الذهبي الأوروبي.",
      "5. لعبت كل مسيرتي الاحترافية التي امتدت لـ 25 عاماً في نادٍ واحد فقط.",
      "6. فزت بكأس العالم 2006 وسجلت ركلة جزاء حاسمة ضد أستراليا.",
      "7. أنا إيطالي، وألقب بـ (ملك روما)، وأرتدي القميص رقم 10.",
    ],
  },
  {
    name: "أليساندرو ديل بييرو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي مهاجم متأخر.",
      "3. بدأت في نادي بادوفا قبل أن أنتقل لعملاق تورينو وأنا شاب.",
      "4. بقيت مع فريقي حتى عندما تم تهبيطنا للدرجة الثانية بسبب فضيحة التلاعب.",
      "5. أملك زاوية تسجيل شهيرة في منطقة الجزاء سُميت باسمي.",
      "6. فزت بدوري أبطال أوروبا وكأس العالم وسجلت في نصف نهائي مونديال 2006 ضد ألمانيا.",
      "7. أنا إيطالي، والأسطورة المطلقة لنادي يوفنتوس، وأرتدي الرقم 10.",
    ],
  },
  {
    name: "دينيس بيركامب",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي مهاجم متأخر وصانع ألعاب.",
      "3. تجربتي في الدوري الإيطالي مع إنتر ميلان كانت سيئة بسبب أسلوب اللعب الدفاعي.",
      "4. أعاني من (فوبيا الطيران) وكنت أسافر للمباريات الأوروبية بالقطار أو السيارة.",
      "5. سجلت هدفاً إعجازياً ضد الأرجنتين في ربع نهائي كأس العالم 1998 بـ 3 لمسات فقط.",
      "6. كنت جزءاً أساسياً من جيل اللاهزيمة في الدوري الإنجليزي.",
      "7. أنا هولندي، وأسطورة نادي أرسنال، وسجلت هدف الدوران الشهير ضد نيوكاسل.",
    ],
  },
  {
    name: "ديفيد سيلفا",
    hints: [
      "1. أنا لاعب معتزل .",
      "2. مركزي الأساسي صانع ألعاب وخط وسط.",
      "3. بدأت وتألقت في إسبانيا مع نادي فالنسيا قبل أن أنتقل لإنجلترا.",
      "4. فزت بكأس العالم وبطولتي يورو مع الجيل الذهبي لمنتخب بلادي.",
      "5. كنت العقل المدبر لخط وسط فريقي الإنجليزي طوال عقد من الزمان.",
      "6. أنهيت مسيرتي في إسبانيا مع نادي ريال سوسيداد بعد إصابة في الرباط الصليبي.",
      "7. أنا إسباني، وأسطورة نادي مانشستر سيتي الإنجليزي، وأرتدي الرقم 21.",
    ],
  },
  {
    name: "إيدين هازارد",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي جناح أيسر وصانع ألعاب.",
      "3. تألقت في فرنسا مع نادي ليل وحققت معهم لقب الدوري.",
      "4. أشتهر بقدرتي الفائقة على المراوغة، لكنني كنت أعاني من عدم الالتزام بالتدريبات.",
      "5. حصدت جائزة أفضل لاعب في الدوري الإنجليزي وقُدت فريقي لبطولات عديدة.",
      "6. انتقالي في عام 2019 لإسبانيا كان كارثياً بسبب سلسلة إصابات لم تنتهِ.",
      "7. أنا بلجيكي، وأسطورة نادي تشيلسي، وأرتدي الرقم 10.",
    ],
  },
  {
    name: "مسعود أوزيل",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي هو صانع الألعاب (كلاسيكي).",
      "3. تألقت في مونديال 2010 مع بلادي وانتقلت بعدها لأكبر أندية إسبانيا.",
      "4. كنت ملك التمريرات الحاسمة (الأسيست) في جَنبات الدوري الإسباني والإنجليزي.",
      "5. غادرت النادي الملكي الإسباني وسط غضب من النجم الأول للفريق (كريستيانو).",
      "6. توجت بكأس العالم 2014، لكنني اعتزلت دولياً بسبب أزمات سياسية وعنصرية.",
      "7. أنا ألماني (من أصول تركية)، ولعبت لريال مدريد وأرسنال، وألقب بـ (عازف الليل).",
    ],
  },
  {
    name: "باستيان شفاينشتايجر",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي خط وسط دفاعي وهجومي.",
      "3. بدأت مسيرتي كجناح قبل أن يتم تحويلي لمحور خط وسط.",
      "4. لعبت في إنجلترا لفترة قصيرة تحت قيادة فان جال ومورينيو ولم أحقق النجاح المتوقع.",
      "5. حققت الثلاثية التاريخية في 2013 وكنت الجندي المجهول في الملعب.",
      "6. دمي سال على أرضية ملعب الماراكانا في نهائي كأس العالم الذي توجت به.",
      "7. أنا ألماني، وأسطورة بايرن ميونخ، وألقب بـ (شفايني).",
    ],
  },
  {
    name: "تشابي ألونسو",
    hints: [
      "1.  أنا لاعب معتزل.",
      "2. مركزي الأساسي هو خط وسط ارتكاز (صانع لعب متأخر).",
      "3. بدأت وتألقت في إسبانيا مع ريال سوسيداد.",
      "4. سجلت الهدف الثالث في (معجزة إسطنبول) الذي أعاد فريقي في نهائي دوري الأبطال.",
      "5. لعبت تحت قيادة جوارديولا وأنشيلوتي ومورينيو وبينيتيز.",
      "6. فزت بدوري الأبطال مع ليفربول وريال مدريد، وتوجت بكل شيء مع إسبانيا.",
      "7. أتميز بالتمريرات الطولية المليمتيرية، ودربت باير ليفركوزن لتحقيق إنجاز لا يُهزم.",
    ],
  },
  {
    name: "بول سكولز",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي خط وسط.",
      "3. أنا من اللاعبين القلائل الذين يعانون من مرض (الربو) ورغم ذلك مسيرتي كانت حافلة.",
      "4. اعتزلت كرة القدم ثم تراجعت عن قراري وعدت للعب استجابة لطلب مدربي الأسطوري.",
      "5. غبت عن المباراة النهائية العظيمة لفريقي عام 1999 بسبب الإيقاف.",
      "6. أنا (لاعب النادي الواحد) ولم أمثل أي قميص آخر في مسيرتي.",
      "7. أنا إنجليزي، وأسطورة خط وسط مانشستر يونايتد، وأتميز بتسديداتي الصاروخية.",
    ],
  },
  {
    name: "ريان غيغز",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي جناح أيسر.",
      "3. في بداياتي كنت ألعب في أكاديمية المنافس الأزرق لمدينتي قبل أن يخطفني السير أليكس.",
      "4. سجلت هدفاً أسطورياً ضد أرسنال في الكأس بعد مراوغة نصف الفريق.",
      "5. أنا اللاعب الأكثر مشاركة وتتويجاً بالبطولات في تاريخ فريقي.",
      "6. لم أشارك في كأس العالم أو اليورو أبداً بسبب ضعف منتخب بلادي.",
      "7. أنا ويلزي، والأسطورة الخالدة لمانشستر يونايتد بالقميص رقم 11.",
    ],
  },
  {
    name: "يايا توريه",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي خط وسط (بوكس تو بوكس).",
      "3. لعبت في دوريات عديدة مثل أوكرانيا واليونان وفرنسا قبل أن أصبح نجماً عالمياً.",
      "4. لعبت كـ قلب دفاع في نهائي دوري أبطال أوروبا 2009 وحققت اللقب.",
      "5. غادرت النادي الإسباني بسبب تهميشي لصالح لاعب شاب (بوسكيتس).",
      "6. كنت النجم الأهم في بناء مشروع فريقي الإنجليزي الجديد وتحقيق الدوري بعد عقود.",
      "7. أنا إيفواري، وأسطورة لخط وسط مانشستر سيتي، وأرتدي الرقم 42.",
    ],
  },
  {
    name: "روي كين",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي خط وسط ارتكاز دفاعي.",
      "3. بدأت في نوتينغهام فورست قبل انتقالي لفريق الشياطين الحمر.",
      "4. تلقيت عدداً ضخماً من البطاقات الحمراء وأنهيت مسيرة لاعب (هالاند الأب) بتدخل متعمد.",
      "5. طُردت من معسكر منتخب بلادي قبل كأس العالم 2002 بسبب خلاف مع المدرب.",
      "6. أنا أيرلندي، وأشهر قائد في تاريخ مانشستر يونايتد تحت قيادة السير أليكس فيرجسون.",
      "7. أشتهر بشراستي الشديدة وعداوتي التاريخية مع باتريك فييرا.",
    ],
  },
  {
    name: "باتريك فييرا",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي خط وسط دفاعي (بوكس تو بوكس).",
      "3. لعبت مباراة واحدة فقط مع ميلان الإيطالي قبل أن يكتشفني مدرب مواطني في إنجلترا.",
      "4. فزت بالدوري الإيطالي 4 مرات متتالية مع يوفنتوس وإنتر ميلان بعد مغادرتي إنجلترا.",
      "5. توجت بكأس العالم 1998 وصنعت الهدف الذهبي في نهائي يورو 2000.",
      "6. أنا فرنسي، والقائد التاريخي لجيل اللاهزيمة في الدوري الإنجليزي الممتاز.",
      "7. أسطورة نادي أرسنال وأرتدي الرقم 4، وعدوي اللدود هو روي كين.",
    ],
  },
  {
    name: " كارل هاينز رومانيجي",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي راس حربه .",
      "3. تألقت في بداياتي في الدوري الألماني ولم ألعب خارج بلدي إلا في أواخر مسيرتي.",
      "4. خسرت نهائي كأس العالم مرتين متتاليتين كقائد لمنتخب بلادي (1982 و 1986).",
      "5. احترفت في الدوري الإيطالي مع إنتر ميلان، وأنهيت مسيرتي في الدوري السويسري.",
      "5. احترفت في الدوري الإيطالي مع إنتر ميلان، وأنهيت مسيرتي في الدوري السويسري.",
      "6. توجت بجائزة الكرة الذهبية مرتين متتاليتين (1980 و 1981)، وفزت بلقب يورو 1980.",
      "7. أنا أسطورة بايرن ميونخ وألمانيا، وأحد أعظم المهاجمين في تاريخ الكرة الألمانية.",
    ],
  },
  {
    name: "باولو مالديني",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي قلب دفاع وظهير أيسر.",
      "3. والدي كان قائداً تاريخياً لنفس الفريق الذي لعبت له.",
      "4. لم أتلقَ سوى 3 بطاقات حمراء في مسيرة امتدت لـ 25 عاماً.",
      "5. حققت دوري أبطال أوروبا 5 مرات، وخسرت نهائي كأس العالم 1994 بركلات الترجيح.",
      "6. النادي الذي لعبت له حجب رقم قميصي ولن يرتديه سوى أحد أبنائي.",
      "7. أنا إيطالي، الأسطورة الخالدة لنادي ميلان، وأرتدي الرقم 3.",
    ],
  },
  {
    name: "فابيو كانافارو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي قلب دفاع.",
      "3. كنت أعمل كـ (جامع كرات) في مونديال 1990 وكنت أشاهد مارادونا في فريقي المحلي.",
      "4. لعبت في إيطاليا لأندية نابولي، بارما، إنتر، ويوفنتوس.",
      "5. انتقلت لريال مدريد بعد هبوط يوفنتوس وفزت بالليغا.",
      "6. أنا المدافع الوحيد الذي فاز بجائزة أفضل لاعب في العالم (الكرة الذهبية) في العصر الحديث.",
      "7. قُدت منتخب إيطاليا لرفع كأس العالم 2006 كقائد للفريق.",
    ],
  },
  {
    name: "أليساندرو نيستا",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي قلب دفاع.",
      "3. بدأت في لاتسيو وكنت قائداً لهم وحققت الدوري قبل الانتقال في أزمة مالية للنادي.",
      "4. كنت أعاني من لعنة الإصابات في بطولات كأس العالم وغبت عن مباريات حاسمة.",
      "5. شكلت ثنائياً دفاعياً لا يُخترق مع مالديني في فريقي الثاني.",
      "6. فزت بدوري أبطال أوروبا مرتين وكأس العالم 2006.",
      "7. أنا إيطالي، وأسطورة دفاع ميلان، وأشتهر بـ الأناقة المطلقة في استخلاص الكرة (التاكلينج).",
    ],
  },
  {
    name: "جون تيري",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي قلب دفاع.",
      "3. لعبت كحارس مرمى لعدة دقائق في مباراة بالدوري الإنجليزي بعد طرد حارسي.",
      "4. غبت عن نهائي دوري الأبطال 2012 بسبب الإيقاف، لكنني ارتديت طقم اللعب ورفعت الكأس.",
      "5. انزلقت قدمي وأهدرت ركلة جزاء كانت ستمنح فريقي دوري الأبطال في موسكو.",
      "6. أنا القائد التاريخي والمدافع الأبرز في تاريخ نادي لندني أزرق.",
      "7. أنا إنجليزي، أسطورة نادي تشيلسي، وأرتدي الرقم 26.",
    ],
  },
  {
    name: "ريو فرديناند",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي قلب دفاع.",
      "3. بدأت في وست هام، ثم حطمت الرقم القياسي كأغلى مدافع في العالم مرتين.",
      "4. تعرضت للإيقاف لـ 8 أشهر بسبب التخلف عن فحص المنشطات.",
      "5. شكلت إحدى أعظم الثنائيات الدفاعية في تاريخ البريميرليج مع الصربي فيديتش.",
      "6. حققت دوري أبطال أوروبا 2008، وأنا إنجليزي الجنسية.",
      "7. أسطورة دفاع مانشستر يونايتد الإنجليزي، وأرتدي الرقم 5.",
    ],
  },
  {
    name: "نيمانيا فيديتش",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي قلب دفاع.",
      "3. بدأت في النجم الأحمر ببلجراد، وتألقت في روسيا مع سبارتاك موسكو.",
      "4. كنت مستعداً للتجنيد في جيش بلادي أثناء الحرب قبل أن أنتقل لإنجلترا.",
      "5. فزت بجائزة أفضل لاعب في الدوري الإنجليزي مرتين (نادرة للمدافعين).",
      "6. أنا صربي الجنسية، وشكلت جداراً حديدياً مع ريو فرديناند.",
      "7. أسطورة دفاع مانشستر يونايتد، وأشتهر باللعب الدموي والتضحية برأسي في الكرات.",
    ],
  },
  {
    name: "خافيير زانيتي",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي ظهير أيمن، خط وسط، وأحياناً أيسر.",
      "3. في بداياتي في بلدي، قيل لي أن بنيتي ضعيفة ولا أصلح للعب كرة القدم.",
      "4. لم أحصل على بطاقة حمراء طوال مسيرتي في الدوري الإيطالي.",
      "5. قُدت فريقي للفوز بالثلاثية التاريخية في إيطاليا عام 2010.",
      "6. النادي حجب رقم قميصي بعد اعتزالي وأصبحت نائب رئيس النادي.",
      "7. أنا أرجنتيني، القائد التاريخي لإنتر ميلان، وألقب بـ (الجرار) وأرتدي الرقم 4.",
    ],
  },
  {
    name: "كافو",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي ظهير أيمن.",
      "3. لعبت لنادي ريال سرقسطة في إسبانيا لفترة قصيرة جداً وغير ناجحة.",
      "4. تألقت في إيطاليا مع نادي روما وحققت معهم لقب الدوري.",
      "5. أنا اللاعب الوحيد في التاريخ الذي شارك في 3 نهائيات كأس عالم متتالية.",
      "6. رفعت كأس العالم كقائد لمنتخب بلادي في 2002.",
      "7. أنا برازيلي، ولعبت لميلان وروما، وأعتبر أعظم ظهير أيمن في التاريخ.",
    ],
  },
  {
    name: "أشلي كول",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي ظهير أيسر.",
      "3. لعبت كمعار في نادي كريستال بالاس في بداياتي.",
      "4. كنت جزءاً من جيل (اللاهزيمة) في أرسنال، ثم أثارت صفقة انتقالي للغريم غضباً واسعاً.",
      "5. اللاعب الإنجليزي الوحيد الذي قال كريستيانو رونالدو أنه أصعب مدافع واجهه.",
      "6. فزت بدوري أبطال أوروبا في ميونخ 2012.",
      "7. أنا إنجليزي الجنسية، وأسطورة لآرسنال وتشيلسي في الجبهة اليسرى.",
    ],
  },
  {
    name: "فيليب لام",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي ظهير أيمن (وأحياناً أيسر أو خط وسط).",
      "3. لعبت لنادي شتوتجارت معاراً لموسمين قبل أن أعود لفريقي الأساسي.",
      "4. طوال مسيرتي الاحترافية كعنصر دفاعي، لم أتلقَ أي بطاقة حمراء.",
      "5. جوارديولا صرح بأنني أذكى لاعب دربه في مسيرته.",
      "6. رفعت كأس العالم 2014، وحققت الثلاثية التاريخية في 2013 كقائد.",
      "7. أنا ألماني، والأسطورة الخالدة والجندي المجهول لبايرن ميونخ.",
    ],
  },
  {
    name: "بيتر شمايكل",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي حارس مرمى.",
      "3. في بداياتي لعبت لنادي بروندبي في بلدي وحققت معهم بطولات محلية.",
      "4. سجلت 11 هدفاً في مسيرتي كحارس مرمى.",
      "5. فزت بالثلاثية التاريخية عام 1999 في آخر موسم لي مع فريقي الإنجليزي.",
      "6. قُدت منتخب بلادي لفوز إعجازي ببطولة يورو 1992.",
      "7. أنا دنماركي، وأسطورة حراسة مانشستر يونايتد، وابني فاز بالبريميرليج أيضاً.",
    ],
  },
  {
    name: "أوليفر كان",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي حارس مرمى.",
      "3. بدأت وتألقت مع نادي كارلسروه قبل انتقالي للعملاق البافاري.",
      "4. أنا الحارس الوحيد الذي فاز بجائزة (أفضل لاعب) في بطولة كأس العالم.",
      "5. ارتكبت خطأً فادحاً في نهائي مونديال 2002 كلف بلادي اللقب.",
      "6. حققت دوري الأبطال عام 2001 بتصديات إعجازية في ركلات الترجيح.",
      "7. أنا ألماني، وأسطورة بايرن ميونخ، وأشتهر بالملامح الغاضبة ولقب (العملاق).",
    ],
  },
  {
    name: "إدوين فان دير سار",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي حارس مرمى.",
      "3. حققت دوري أبطال أوروبا مع أياكس في التسعينات.",
      "4. انتقلت لإيطاليا للعب مع يوفنتوس ولكنني فقدت مركزي لصالح حارس شاب (بوفون).",
      "5. عدت للتألق في إنجلترا مع فولهام، ثم انتقلت لفريقي الأعظم وأنا في سن الـ 34.",
      "6. تصديت لركلة جزاء نيكولاس أنيلكا لأمنح فريقي دوري أبطال 2008.",
      "7. أنا هولندي، وأسطورة حراسة مانشستر يونايتد بجيله الذهبي الأخير.",
    ],
  },
  {
    name: "بيتر تشيك",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي حارس مرمى.",
      "3. تألقت في فرنسا مع نادي رين قبل الانتقال للدوري الإنجليزي الممتاز.",
      "4. أحمل الرقم القياسي لأكثر عدد من الشباك النظيفة (الكلين شيت) في تاريخ البريميرليج.",
      "5. تعرضت لإصابة خطيرة جداً بكسر في الجمجمة كادت تنهي حياتي.",
      "6. تصديت لركلة جزاء من روبن وركلات ترجيح في نهائي أبطال 2012 لأمنح فريقي اللقب.",
      "7. أنا تشيكي الجنسية، أسطورة تشيلسي، وأرتدي دائماً (خوذة) واقية للرأس.",
    ],
  },
  {
    name: "نيلسون ديدا",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي حارس مرمى.",
      "3. بدأت في البرازيل ولعبت لكورينثيانز وكروزيرو.",
      "4. اشتهرت بالتألق اللافت في التصدي لركلات الجزاء في المباريات الحاسمة.",
      "5. كنت جزءاً من الخسارة المدوية في (معجزة إسطنبول) ضد ليفربول.",
      "6. فزت بلقبي دوري أبطال أوروبا مع الجيل الذهبي لفريقي الإيطالي.",
      "7. أنا برازيلي الجنسية، والحارس التاريخي لنادي ميلان الإيطالي في الألفية الجديدة.",
    ],
  },
  {
    name: "أليكسيس سانشيز",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي جناح أيسر ومهاجم.",
      "3. لعبت في الأرجنتين لريفربليت وتألقت في إيطاليا مع أودينيزي.",
      "4. حققت بطولتي كوبا أمريكا متتاليتين على حساب الأرجنتين (ميسي).",
      "5. سجلت ركلة الجزاء الحاسمة بأسلوب (بانينكا) لأمنح بلادي لقبها الأول تاريخياً.",
      "6. تألقت في أرسنال الإنجليزي، وانتقلت لمانشستر يونايتد في صفقة تبادلية فاشلة.",
      "7. أنا من تشيلي، وألعب حالياً، وألقب بـ (إل نينيو مارافيا - الفتى المعجزة).",
    ],
  },
  {
    name: "إدينسون كافاني",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي رأس حربة.",
      "3. تألقت بشكل ملفت للأنظار في إيطاليا مع باليرمو ثم نابولي وحققت لقب الهداف.",
      "4. شكلت ثلاثياً مرعباً مع نيمار وإمبابي في فرنسا.",
      "5. أنا الهداف التاريخي الثاني لنادي باريس سان جيرمان.",
      "6. لعبت لمانشستر يونايتد وفالنسيا، وألعب حالياً لبوكا جونيورز.",
      "7. أنا أوروجواياني، وألقب بـ (الماتادور)، وأشتهر باحتفال رمي السهم.",
    ],
  },
  {
    name: "راداميل فالكاو",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي رأس حربة.",
      "3. تألقت في الأرجنتين مع ريفر بليت قبل عبور المحيط إلى بورتو البرتغالي.",
      "4. أنا اللاعب الوحيد الذي حقق الدوري الأوروبي متتالياً مع فريقين مختلفين.",
      "5. سجلت (هاتريك) مرعب في شباك تشيلسي بكأس السوبر الأوروبي.",
      "6. دمرت إصابة الرباط الصليبي فترتي في إنجلترا (يونايتد وتشيلسي).",
      "7. أنا كولومبي، وتألقت مع أتلتيكو مدريد، وألقب بـ (النمر).",
    ],
  },
  {
    name: "غونزالو هيغواين",
    hints: [
      "1. أنا لاعب معتزل.",
      "2. مركزي الأساسي رأس حربة.",
      "3. بدأت في ريفر بليت، وانتقلت إلى ريال مدريد شاباً وسجلت أهدافاً حاسمة بالدوري.",
      "4. حطمت الرقم القياسي لأكثر عدد أهداف في موسم واحد بالدوري الإيطالي مع نابولي (36 هدفاً).",
      "5. انتقلت ليوفنتوس بصفقة تاريخية أثارت غضب جماهير الجنوب الإيطالي.",
      "6. أهدرت انفراداً شهيراً بمانويل نوير في نهائي كأس العالم 2014.",
      "7. أنا أرجنتيني الجنسية، وألقب بـ (البيبيتا).",
    ],
  },
  {
    name: "روميلو لوكاكو",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي رأس حربة.",
      "3. بدأت في أندرلخت البلجيكي وانتقلت لتشيلسي شاباً لكنني أضعت ركلة ترجيح حاسمة ورحلت.",
      "4. تألقت في إيفرتون، وحققت الدوري الإيطالي مع إنتر ميلان وكسرت هيمنة يوفنتوس.",
      "5. تم دفع أكثر من 300 مليون يورو في مجمل انتقالاتي خلال مسيرتي.",
      "6. أنا الهداف التاريخي لمنتخب بلادي.",
      "7. أنا بلجيكي الجنسية، وأشتهر بالبنية الجسدية الضخمة، ولعبت لروما وميلان.",
    ],
  },
  {
    name: "بيير إيميريك أوباميانغ",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي رأس حربة وجناح.",
      "3. كنت لاعباً في شباب ميلان الإيطالي لكنني لم ألعب للفريق الأول.",
      "4. توجت بلقب هداف الدوري الألماني، وهداف الدوري الإنجليزي الممتاز.",
      "5. لعبت لبرشلونة وسجلت ثنائية في أول كلاسيكو لي بملعب البرنابيو.",
      "6. ألعب حالياً في الدوري السعودي (نادي القادسية).",
      "7. أنا غابوني الجنسية، تألقت مع دورتموند وأرسنال، وأحتفل بقناع (باتمان أو سبايدرمان).",
    ],
  },
  {
    name: "روبرتو فيرمينو",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي مهاجم وهمي (صانع ألعاب متقدم).",
      "3. اكتشفني أحد كشافي الأندية عبر لعبة (Football Manager) ونقلني لألمانيا.",
      "4. تألقت مع هوفنهايم قبل الانتقال للدوري الإنجليزي.",
      "5. كنت الرابط الخفي والقطعة الأهم تكتيكياً في ثلاثي هجومي تاريخي بإنجلترا.",
      "6. سجلت هدف الفوز في نهائي كأس العالم للأندية 2019.",
      "7. أنا برازيلي، أسطورة ليفربول، ألعب في الأهلي السعودي وأشتهر بـ (تسديدات الـ No-Look).",
    ],
  },
  {
    name: "ماركو رويس",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي خط وسط هجومي وجناح.",
      "3. طُردت من أكاديمية فريقي المفضل في صغري لضعف بنيتي الجسدية.",
      "4. تألقت مع مونشنجلادباخ ثم عدت لفريقي الأم وتخليت عن كل العروض الكبرى لأجله.",
      "5. غبت عن التتويج بكأس العالم 2014 بسبب إصابة في آخر مباراة ودية قبل البطولة.",
      "6. خسرت نهائي دوري الأبطال مرتين مع نفس النادي (2013 و 2024).",
      "7. أنا ألماني، والأسطورة الأوفى لنادي بروسيا دورتموند، وانتقلت مؤخراً للدوري الأمريكي.",
    ],
  },
  {
    name: "تياغو سيلفا",
    hints: [
      "1. أنا لاعب حالي.",
      "2. مركزي الأساسي قلب دفاع.",
      "3. كدت أفقد حياتي في روسيا وأنا شاب بسبب مرض (السل) وقضيت 6 أشهر في المستشفى.",
      "4. تألقت في إيطاليا مع ميلان ثم انتقلت مع إبراهيموفيتش لبناء مشروع النادي الباريسي.",
      "5. خسرت نهائي دوري الأبطال كقائد، وحققته في العام التالي مع فريق لندني.",
      "6. ارتديت شارة قيادة منتخب البرازيل لسنوات طويلة في كأس العالم.",
      "7. ألقب بـ (الوحش)، وعدت مؤخراً لنادي فلومينينسي البرازيلي لأختم مسيرتي.",
    ],
  },
  {
    name: "جورج وياه",
    hints: [
      "1. =انا لاعب معتزل .",
      "2. مركزي الأساسي رأس حربة.",
      "3. نصح أرسين فينجر بالتعاقد معي وأحضرني للدوري الفرنسي مع موناكو.",
      "4. تألقت بشكل خرافي مع باريس سان جيرمان ثم ميلان الإيطالي.",
      "5. سجلت هدفاً أسطورياً من منطقة جزائي إلى مرمى الخصم مراوغاً الجميع.",
      "6. أصبحت رئيس دولة بعد اعتزالي كرة القدم.",
      "7. أنا ليبيري الجنسية، واللاعب الأفريقي الوحيد في التاريخ الذي تُوج بالكرة الذهبية.",
    ],
  },
];

let availableWaiPlayers = [];

function initWhoAmIGame() {
  waiP1Score = 0;
  waiP2Score = 0;
  availableWaiPlayers = [...whoAmIBank].sort(() => 0.5 - Math.random());
  updateWaiUI();
  nextWaiTurn();
}

function updateWaiUI() {
  document.getElementById("wai-p1-score").innerText =
    `${p1Name}: ${waiP1Score}/21`;
  document.getElementById("wai-p2-score").innerText =
    `${p2Name}: ${waiP2Score}/21`;
  document.getElementById("wai-turn-indicator").innerText =
    `دور: ${currentTurnName}`;
  document.getElementById("wai-current-points").innerText = currentWaiPoints;
}

function nextWaiTurn() {
  // التحقق من الفوز
  if (waiP1Score >= WAI_WIN_TARGET || waiP2Score >= WAI_WIN_TARGET) {
    let winner = waiP1Score >= WAI_WIN_TARGET ? p1Name : p2Name;
    document.getElementById("wai-turn-indicator").innerText =
      `🎉 فاز ${winner} بالمباراة! 🎉`;
    document.getElementById("wai-player-name").innerText = "النهاية";
    document.getElementById("wai-player-name").classList.remove("hidden-name");
    document.getElementById("btn-wai-next-hint").disabled = true;
    document.getElementById("btn-wai-guess").disabled = true;
    document.getElementById("btn-wai-fail").disabled = true;
    return;
  }

  if (availableWaiPlayers.length === 0) {
    availableWaiPlayers = [...whoAmIBank].sort(() => 0.5 - Math.random());
  }

  currentWaiPlayer = availableWaiPlayers.pop();
  currentHintIndex = 0;
  currentWaiPoints = 7;

  document.getElementById("wai-player-name").innerText = "؟؟؟";
  document.getElementById("wai-player-name").classList.add("hidden-name");

  // تفعيل الأزرار
  document.getElementById("btn-wai-next-hint").disabled = false;
  document.getElementById("btn-wai-guess").disabled = false;
  document.getElementById("btn-wai-fail").disabled = false;

  renderWaiHints();
  updateWaiUI();
}

function renderWaiHints() {
  const list = document.getElementById("wai-hints-list");
  list.innerHTML = "";
  // عرض التلميحات التي تم كشفها فقط
  for (let i = 0; i <= currentHintIndex; i++) {
    let li = document.createElement("li");
    li.innerText = currentWaiPlayer.hints[i];
    list.appendChild(li);
  }
}

// زر كشف تلميح إضافي
document.getElementById("btn-wai-next-hint").addEventListener("click", () => {
  if (currentHintIndex < 6) {
    currentHintIndex++;
    currentWaiPoints--;
    renderWaiHints();
    document.getElementById("wai-current-points").innerText = currentWaiPoints;
  } else {
    alert("هذا هو التلميح الأخير! إما أن تجاوب أو تستسلم.");
  }
});

// زر الإجابة الصحيحة
document.getElementById("btn-wai-guess").addEventListener("click", () => {
  document.getElementById("wai-player-name").innerText = currentWaiPlayer.name;
  document.getElementById("wai-player-name").classList.remove("hidden-name");

  // إيقاف الأزرار لحظياً
  document.getElementById("btn-wai-next-hint").disabled = true;
  document.getElementById("btn-wai-guess").disabled = true;
  document.getElementById("btn-wai-fail").disabled = true;

  if (currentTurnName === p1Name) {
    waiP1Score += currentWaiPoints;
    currentTurnName = p2Name; // نقل الدور
  } else {
    waiP2Score += currentWaiPoints;
    currentTurnName = p1Name; // نقل الدور
  }

  updateWaiUI();

  setTimeout(() => {
    nextWaiTurn();
  }, 2500); // الانتظار ثانيتين ونصف للاحتفال قبل السؤال القادم
});

// زر الفشل أو الاستسلام
document.getElementById("btn-wai-fail").addEventListener("click", () => {
  document.getElementById("wai-player-name").innerText = currentWaiPlayer.name;
  document.getElementById("wai-player-name").classList.remove("hidden-name");

  document.getElementById("btn-wai-next-hint").disabled = true;
  document.getElementById("btn-wai-guess").disabled = true;
  document.getElementById("btn-wai-fail").disabled = true;

  // لا يتم إضافة نقاط، وينتقل الدور فقط
  currentTurnName = currentTurnName === p1Name ? p2Name : p1Name;
  updateWaiUI();

  setTimeout(() => {
    nextWaiTurn();
  }, 2500);
});
