(() => {
    
    // Hamburger event listener to toggle navbar on mobile devices
    const menu_btn = document.querySelector('.hamburger');
    menu_btn.addEventListener('click', ev => {
        menu_btn.classList.toggle('is-active')
        menu.classList.toggle('show');
        logoName.classList.toggle('hide');
    });

  })()
