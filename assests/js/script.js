$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if(window.scrollY>60){
            document.querySelector('#scroll-top').classList.add('active');
        }else{
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function(){
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if(top>offset && top<offset+height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click',function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop : $($(this).attr('href')).offset().top,
        },500, 'linear')
    })
});

document.addEventListener('visibilitychange',
function(){
    if(document.visibilityState === "visible"){
        document.title = "Portfolio | Saurav Mukherjee";
        $("#favicon").attr("href","assests/images/favicon.png");
    }
    else {
        document.title = "Come Back To Portfolio";
        
    }
});


// <!-- typed js effect starts -->
    var typed = new Typed(".typing-text", {
        strings: ["Full-Stack development", "Machine Learning", "Cloud Computing", "Tech Communities"],
        loop: true,
        typeSpeed: 50,
		backSpeed: 25,
		backDelay: 500,
      });
// <!-- typed js effect ends -->

// <!-- tilt js effect starts -->
      VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
      });
// <!-- tilt js effect ends -->



// Start of Tawk.to Live Chat
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/60f70460649e0a0a5ccd22a7/1fb2ei71o';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();
// End of Tawk.to Live Chat

 // <!-- emailjs to mail contact form data -->
 $("#contact-form").submit(function (event) {
    //event.preventdefault();
    
    event.preventDefault();
    emailjs.init("tKcnAF73jMw0tRWFB");
    console.log("form submitted");
    emailjs.sendForm('service_sxhkdba', 'template_9fbmhxi', '#contact-form')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById("contact-form").reset();
            alert("Form Submitted Successfully");
        }, function (error) {
            console.log('FAILED...', error);
            alert("Form Submission Failed! Try Again");
        });
    
});




/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});



async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

fetchData().then(data => {
    showSkills(data);
});

/* SCROLL HOME */
srtop.reveal('.home .content h3',{delay: 200}); 
srtop.reveal('.home .content p',{delay: 200}); 
srtop.reveal('.home .content .btn',{delay: 200}); 

srtop.reveal('.home .image',{delay: 400}); 
srtop.reveal('.home .linkedin',{interval: 600}); 
srtop.reveal('.home .github',{interval: 800}); 
srtop.reveal('.home .twitter',{interval: 1000});
srtop.reveal('.home .telegram',{interval: 600}); 
srtop.reveal('.home .instagram',{interval: 600}); 



/* SCROLL ABOUT */
srtop.reveal('.about .content h3',{delay: 300});
srtop.reveal('.about .content .tag',{delay: 400}); 
srtop.reveal('.about .content p',{delay: 300}); 
srtop.reveal('.about .content .box-container',{delay: 300}); 
srtop.reveal('.about .content .resumebtn',{delay: 300}); 


/* SCROLL EDUCATION */
srtop.reveal('.education .box',{interval: 200}); 

/* SCROLL PROJECTS */
srtop.reveal('.work .box',{interval: 200}); 

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline',{delay: 400});
srtop.reveal('.experience .timeline .container',{interval: 400}); 

/* SCROLL CONTACT */
srtop.reveal('.contact .container',{delay: 400});
srtop.reveal('.contact .container .form-group',{delay: 400});
