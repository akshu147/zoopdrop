import React, { useEffect, useRef, useState } from 'react'

const Ofset = () => {
    const [mtop, setmtop] = useState(0)
    const elementref = useRef(0);
    const getdistance = () => {
      const distance = elementref.current;
      if(distance){
        setmtop(distance.getBoundingClientRect().top)
      }
    }
    useEffect(() => {
      getdistance();
      window.addEventListener("scroll", getdistance)
  
    }, [])
    const offsetTop = mtop >= 0 ? mtop : 0;
 
  return (
    <>
          <section className="_d h-[100%] md:h-[80vh] overflow-hidden flex flex-col md:flex-row justify-between" ref={elementref}>

<div className='grid grid-cols-4 gap-[20px] w-[100%] md:w-[62%] rotate-[20deg] mt-[-170px] md:ms-[-120px]'>


  <div className={`flex flex-col gap-[20px]`} style={{ marginTop: `${offsetTop * 0.5}px`}}>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/96/71/8f/96718fd26a9c632a49c6b3342fde668d.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://s.poply.com/static/templates/v2/dinner_party_04/thumbnail_small.avif?v=17fd1caa81cf79" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://s.poply.com/static/images/landing/spring_2024/theme_17_thumbnail@2x.avif?v=17fd1caa81cf79" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/32/31/25/3231250cd69366d02d910e75352a8647.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://s.poply.com/static/images/landing/spring_2024/theme_17_thumbnail@2x.avif?v=17fd1caa81cf79" alt="" /></div>

  </div>

  <div className={`flex flex-col gap-[20px]`} style={{ marginTop: `${-offsetTop * 0.5}px`}}>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://s.poply.com/static/images/landing/spring_2024/theme_17_thumbnail@2x.avif?v=17fd1caa81cf79" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/93/bf/49/93bf49ad438bfbc031d06fe60dcd8395.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://s.poply.com/static/templates/v2/birthday_kid_01/thumbnail_small.avif?v=17fd1caa81cf79" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://s.poply.com/static/templates/v2/dinner_party_02/thumbnail_small.avif?v=17fd1caa81cf79" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/4d/43/af/4d43af691c4fba3e1a33935d0b0c4174.jpg" alt="" /></div>

  </div>

  <div className={`flex flex-col gap-[20px]`} style={{ marginTop: `${offsetTop * 0.5}px`}}>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://s.poply.com/static/templates/v2/just_because_04/thumbnail_small.avif?v=17fd1caa81cf79" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/30/77/eb/3077eb63efc61040dff72d24c0038ca8.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/59/04/b8/5904b824f9eaf661a87953240e31bc94.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://s.poply.com/static/templates/v2/nightlife_04/thumbnail_small.avif?v=17fd1caa81cf79" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/9e/13/69/9e1369d442d8c9d85cae306f78eee2eb.jpg" alt="" /></div>

  </div>

  <div className={`flex flex-col gap-[20px]`} style={{ marginTop: `${-offsetTop * 0.5}px` }}>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/07/3e/e4/073ee46320be53d7cb5c745d615ee59e.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/44/fb/68/44fb68a0ef670d3e1e0cdc2fc89adf8e.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/474x/c0/e9/e2/c0e9e2b976f0e1bde93e9a76edf0efc5.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/21/88/58/2188587d56b246264fbbf89f23cee6c6.jpg" alt="" /></div>
    <div className='rounded-[10px] overflow-hidden'><img width="100%" src="https://i.pinimg.com/236x/ee/32/d7/ee32d713aa645736a8a017c34b4db3f5.jpg" alt="" /></div>

  </div>
</div>
<div className=' w-[100%] md:w-[38%] text-white h-[100%] grid place-items-center mt-[30px] sm:mt-[90px] md:m-[0px]'>
  <div>
  <h1 className='text-center text-[50px] font-bold leading-10'>Invitation templates for every event</h1>
  <p className='text-center text-[25px] px-[30px] py-[20px]'>We’ve got you covered with our stylish collection of designs for any occasion.</p>
  <button className='rounded-[8px] block border-[2px] border-white p-[17px_40px] m-[10px_auto] lg:m-[20px_auto] xl:m-[30px_auto]'>BROWSER TEMPLATE</button>

  
  </div>

</div>






</section>

  
    </>
  )
}

export default Ofset
