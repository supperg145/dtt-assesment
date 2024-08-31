<template>
  <div class="about-container">
    <h1>About This Application</h1>

    <section>
      <h2>About the App</h2>
      <p>
        Welcome to our real estate management application. This app is designed
        to make it easier for users to manage and view real estate listings. You
        can add new listings, edit existing ones, and view detailed information
        about each property.
      </p>
      <p>
        The application features a clean and user-friendly interface that allows
        you to efficiently manage your real estate data. Built with Vue.js and
        Vuex, it leverages modern JavaScript technologies to provide a smooth
        and responsive user experience.
      </p>
    </section>

    <section>
      <h2>About the Developer</h2>
      <p>
        This application was developed by Gabor Supper, a passionate software
        developer with a keen interest in building impactful web applications.
        With expertise in front-end development, I aim to deliver high-quality
        solutions that meet the needs of users.
      </p>
    </section>

    <section>
      <h2>About DTT</h2>
      <p>
        DTT is a leading provider of digital transformation solutions. We help
        businesses leverage technology to improve their processes, increase
        efficiency, and drive growth. Our team of experts is dedicated to
        delivering top-notch services and solutions tailored to meet the unique
        needs of each client.
      </p>
      <p>
        For more information, visit our website at
        <a href="https://www.dtt.nl" target="_blank" rel="noopener noreferrer"
          >DTT.nl</a
        >.
      </p>
    </section>

    <section>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or feedback about the application, feel free
        to reach
        <a href="mailto:suppergabor1@gmail.com"> contact me</a>.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

section {
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  color: #333;
}

p {
  line-height: 1.6;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
