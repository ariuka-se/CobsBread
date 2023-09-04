export const about = () => {
  const html = `<section class="about-first">
<img
  src="https://www.cobsbread.com/wp-content/uploads/2022/09/cb22-photo001326_72dpi_1200x628-700x485.jpg"
  width="100%"
  height="400px"
  alt="about us"
/>
</section>
<section class="second">
<article class="text_second">
  <h2>Baked fresh daily by <br />bakers with passion</h2>
  <p>
    At COBS Bread, we celebrate fresh. Whether you’re picking up a
    scratch- baked loaf of bread for the family or a decadent treat for
    yourself, you can always be sure that the day you walk into your
    local bakery is the day we baked it.
  </p>
</article>
<img
  src="https://www.cobsbread.com/wp-content/uploads/2019/10/COBS_FRANCHISE_2019-0369-700x485.jpg"
  alt="our work"
/>
</section>
<section class="third">
<img
  src="https://www.cobsbread.com/wp-content/uploads/2022/12/Brand_700x485-Cinn3-1.jpg"
  alt=""
/>
<article class="text_third">
  <h2>
    No Funny <br />
    Business
  </h2>
  <p>
    Quality ingredients and scratch baking techniques create that warm,
    buttery smell and happy feeling when you walk into a COBS Bread
    bakery. You’ll never have to worry about added preservatives in our
    bread. It’s as important to us as kneading dough or pre-heating the
    oven. From bun to crumb, COBS Bread ingredients are as pure as it
    gets.
  </p>
</article>
</section>
<section class="four">
<article class="text_four">
  <h2>
    Finding a Home <br />
    for Every Bread
  </h2>
  <p>
    Through our End of Day Giving program, our bakeries connect with our
    larger communities by helping every bread find a home after our
    doors close. It makes us a real part of the communities in which we
    operate, provides bread to those who need it, and helps reduce food
    waste.
  </p>
</article>
<img
  src="https://www.cobsbread.com/wp-content/uploads/2022/12/Brand_700x485-SunFlax3-1.jpg"
  alt="third"
/>
</section>
`;
  document.querySelector(".container").innerHTML = html;
};

// document.getElementById("headercomp").insertAdjacentHTML("beforeend", header);
