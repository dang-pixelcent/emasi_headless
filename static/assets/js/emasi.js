// function toggleLeftPanel()
// {
// const panel = document.querySelector('.left-panel-nav');
// const el = panel.querySelectorAll('li.has-child');
// el.forEach(element => {
//   const menu = element.querySelector('a');
//   const sub = element.querySelector('.sub-menu');
//   menu.addEventListener('click', function(){
// 		element.classList.toggle('active');
// 		sub.classList.toggle('active');
//   });
// });
// var screen = document.querySelector('body').offsetWidth;
// if (screen >1200)
// {
//   document.addEventListener('click', event => {
// 	el.forEach(element => {
// 	  if (!element.contains(event.target)){
// 		element.classList.remove('active');
// 	  };
// 	});
//   });
// }
// }
function toggleLeftPanel() {
  const panel = document.querySelector('.left-panel-nav');
  // Thêm điều kiện bảo vệ: Nếu không có panel thì thoát hàm luôn, không chạy tiếp
  if (!panel) return; 

  const el = panel.querySelectorAll('li.has-child');
  if (!el) return;

  el.forEach(element => {
    const menu = element.querySelector('a');
    const sub = element.querySelector('.sub-menu');
    if (menu && sub) {
      menu.addEventListener('click', function(){
            element.classList.toggle('active');
            sub.classList.toggle('active');
      });
    }
  });

  var screen = document.querySelector('body').offsetWidth;
  if (screen > 1200) {
    document.addEventListener('click', event => {
      el.forEach(element => {
        if (!element.contains(event.target)){
          element.classList.remove('active');
        };
      });
    });
  }
}
function effectPrograms()
{
var screen = document.querySelector('body').offsetWidth;
const ParentCon = document.querySelector('.class_slider');
const programs = document.querySelectorAll('.list-item'); 
programs.forEach((el, index)=>{
const box = el.querySelector('.bg-gradient-bottom');
var hBox = box.offsetHeight;
var moreSpace = (hBox / 2);
 box.addEventListener('click', function(){
	const oldPro = document.querySelectorAll('.class_slider .active');

	oldPro.forEach(old => {
	  old.classList.remove('active');
	})
	el.classList.add('active');
   if (screen < 1200)
   {
	var hCon = el.querySelector('.box-detail').offsetHeight;
	var total = (hBox + hCon + moreSpace);
	  if (index == 2)
	  {
		ParentCon.style.height = total +'px';
	  }else{
		ParentCon.style.height = '100%';
	  }
   }
   
  });
});
}

function toggleChildMenu()
{
var screen = document.querySelector('body').offsetWidth;
if (screen <1200)
{
  const mobileNav = document.querySelector('.navbar');
  const child = mobileNav.querySelectorAll('.dropdown');
  if (child.length>0)
  {
	child.forEach(element => {
	  element.addEventListener('click', function(){
			element.classList.toggle('active'); 
	  });
	});
  }
}
}
window.addEventListener('load',function(){
  toggleChildMenu();
  toggleLeftPanel();
  effectPrograms();
});
window.addEventListener('resize',function(){
  toggleChildMenu();
  toggleLeftPanel();
  effectPrograms();
});
