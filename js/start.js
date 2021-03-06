const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 4;
const select = [0, 0, 0, 0];


function calResult()
{
  var mbti = select[0] + select[1] + select[2] + select[3];
  console.log(mbti);

  for(let i=0;i < infoList.length; i++) {
    if( mbti === infoList[i].mbti ){
      return i;
    }
  }
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/MBTI-' + point + '.jpg';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s"
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    },  450);
  });
  // console.log(select);
  setResult();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;
  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i=0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s"
    }

    var questionImg = document.querySelector('.questionImage'+qIdx);
    questionImg.style.WebkitAnimation = "fadeOut 0.5s";
    questionImg.style.animation = "fadeOut 0.5s";

    setTimeout(() => {
      questionImg.style.display = 'none';
      select[qIdx] = qnaList[qIdx].a[idx].type;

      for(let i=0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450);
  }, false);
}

function goNext(qIdx) {
  if(qIdx === endPoint) {
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;

  const qImageDiv = document.querySelector('#qImage');
  var qImage = document.createElement('img');
  var qImageURL = 'img/question-' + qIdx + '.jpg';
  qImage.src = qImageURL;
  qImage.alt = qIdx;
  qImage.classList.add('questionImage'+qIdx);
  qImage.classList.add('img-fluid');
  qImageDiv.appendChild(qImage);

  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s"
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    },  450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
