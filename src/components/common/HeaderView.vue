<script setup>
import ButtonVue from './ButtonVue.vue'
</script>
<template>
  <div class="header">
    <div class="languageBox">
      <div class="language">한국어</div>
      <div class="language">English</div>
      <div class="language">中语</div>
      <div class="language">日本語</div>
    </div>
    <div class="headerContainer">
      <div class="logoBox">
        <img src="../../assets/img/logo_newsdocs.png" alt="logoImg" />
        <h1 class="logo"></h1>
      </div>
      <div class="headerNav">
        <ul>
          <li>맞춤 소식</li>
          <li>다른 소식</li>
          <li>의견 나누기</li>
        </ul>
      </div>
      <div class="headerButtonBox">
        <div class="search">
          <input type="text" class="searchBox" placeholder="키워드로 뉴스 검색" />
          <img src="../../assets/icons/searchIcon.svg" alt="searchIcon" class="searchIcon" />
        </div>
        <ButtonVue class="logInBtn">로그인</ButtonVue>
      </div>
    </div>
  </div>
</template>
<style scoped>
.header {
  padding: 0 100px;
  height: 100px;
}
.languageBox {
  display: flex;
  gap: 10px;
  justify-content: end;
  margin-right: 35px;
}
.language {
  text-decoration: underline;
  cursor: pointer;
  color: #989898;
}
.headerContainer {
  padding: 0px 30px;
  display: flex;
  align-items: center;
}
.logoBox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.logo {
  font-size: 40px;
  user-select: none;
  font-family: 'Luckiest Guy', BagelFatOne, sans-serif;
}
.headerNav {
  margin-left: 30px;
}
.headerNav ul {
  display: flex;
  flex-direction: row;
  gap: 20px;
  user-select: none;
}
.headerNav ul li {
  cursor: pointer;
  width: 120px;
  padding: 8px 12px;
  transition: all 0.3s ease;
  border-radius: 10px;
  text-align: center;
}
.headerNav ul li:hover {
  color: #7537e3;
  font-weight: 700;
  font-size: 18px;
}
.search {
  margin-left: 40px;
  position: relative;
}
.searchBox {
  width: 300px;
  height: 40px;
  padding: 5px;
  border: 1px solid #939393;
  border-radius: 10px;
}
.searchIcon {
  position: absolute;
  right: 10px;
  top: 8px;
  cursor: pointer;
}
.headerButtonBox {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
.logInBtn {
  width: 100px;
  height: 40px;
  padding: 5px 10px;
  transition: all 0.1s ease;
}
.logInBtn:hover {
  background-color: #7956bf;
}
.logInBtn:active {
  transform: scale(0.95);
}
</style>
