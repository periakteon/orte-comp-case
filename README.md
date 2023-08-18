# Orte Company Case - M. Masum Gökyüz

# README (TR)

_Güncelleme: 18 Ağustos 2023_

Bana case'i Çarşamba günü, yani 16 Ağustos 15:30'da teslim ettiniz ve ben de uygulamayı istediğiniz şartları yerine getiren bir şekilde 17 Ağustos 02:55'de bana ulaştığınız numaraya mesaj atarak size teslim ettim:

![image](https://i.hizliresim.com/f3nif5f.png)

Biraz hızlı bir şekilde bitirmiş oldum. Bu, uygulamanın çalışması açısından herhangi bir sorun teşkil etmiyordu fakat uygulamanın kullanım kolaylığı açısından daha da geliştirilebilir ve özelleştirilebilir olmasını istedim. Bu sebeple, veritabanı işlemlerini özelleştirmeyi kolaylaştırmak için bir `.env` dosyası oluşturdum. Bu `.env` içerisinde socket portunu, http portunu ve db bilgilerini istediğiniz gibi özelleştirebilirsiniz (halihazırda o portlarınızın kullanımda olmasını vb. düşünerek bunu eklemek istedim).

README'nin ilk versiyonunda Docker ve MySQL gereksinimi istemiştim ve README dosyasını da sıfır bir bilgisayar sahibine uygun şekilde tasarlamıştım. Ancak sonrasında bunu değiştirmek istedim zira bilgisayarınızda halihazırda MySQL yüklü olabilir. Bu sebeple README dosyasında da ufak bir güncellemeye gittim.

Artık `index.html` dosyası express uygulaması üzerinden static olarak serve edilmektedir. `index.html` dosyası, düzgün çalışabilmesi için `script.js` dosyasına bağlıdır. `script.js` dosyasının ilk satırında da socket portuna bağlantı gerçekleşmektedir. `.env` dosyasında default socket portu `3001`, HTTP portu ise `3000` şeklindedir. `script.js` dosyasındaki socket portunu da `3001` olarak belirledim.

**UYARI: Eğer `.env` dosyasında farklı bir soket portu kullanacaksanız, `script.js` dosyasındaki port numarasını da elle düzeltmeniz gerekmektedir.**

## Video

[![Watch the video](https://img.youtube.com/vi/bTOUj6ik61Q/hqdefault.jpg)](https://www.youtube.com/watch?v=bTOUj6ik61Q)

## Başlamadan Önce:

### Neden TypeScript'i seçmedim?

Kendi projelerimde production'da ortaya çıkabilecek hataları önceden tespit etmek ve type-safety sağlamak için TypeScript kullanıyorum ancak bu projede JavaScript'i tercih ettim. Tabii ki TypeScript aslında JavaScript'in bir üst kümesi ve dolayısıyla JavaScript'den bağımsız değil ancak bize type-safety sağlamasıyla öne çıkıyor. Peki neden bu projede TypeScript'i seçmedim? Aslında projenin kurulumuna ilk olarak TypeScript kurarak başladım ancak daha sonra vazgeçtim çünkü bu case, type-safety gerektirecek kadar karmaşık değildi. Daha kompleks projelerde kesinlikle TypeScript tercih ederdim.

### Neden React yerine vanilla JavaScript ve DOM API seçtim?

Benden istediğiniz case, aslında back-end hakimiyetimi ölçmek istediği için front-end'e girmeme gerek olmadı çünkü gerçekten ölçmek istediği şey back-end'e yönelik hakimiyetimdi. Ayrıca React kullanmak, ayrı bir "npm install" komutu çalıştırmak anlamına gelecekti. Kendi projelerimde React ve Next.js framework'ünü kullanmayı çok seviyorum ve neredeyse her gün React ile yazıyorum ancak bu case için React veya herhangi bir JavaScript kütüphanesi seçmek biraz "overkill" olurdu. Bu sebeple, client tarafını DOM API üzerinden vanilla JavaScript ile hazırladım. Ayrıca "index.html" şeklinde olması, tarayıcıya sürükleyip bırakarak kolayca kullanılabilmesi anlamına geliyordu. Dahası, zaten "index.html" dosyasını app çalıştığında statik olarak serve edebildiğimiz için React kullanmanın bir anlamı olmayacaktı.

### Gereksinimler

- npm
- Node.js
- Docker (eğer MySQL kurulu değilse)
- MySQL

### Kurulum

**1.** Eğer bilgisayarınızda MySQL yüklü değilse, ilk olarak MySQL'i Docker aracılığıyla bilgisayarınıza yüklemeniz gerekir (bilgisayarınızda Docker yoksa, önce Docker'ı yüklemeniz gerekir).

Docker'ı kurduktan sonra terminalden aşağıdaki komutu çalıştırabilirsiniz (eğer halihazırda MySQL kuruluysa, bu adımı pas geçebilirsiniz):

```bash
docker run -p 3306:3306 --name my_mysql_db -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest

```

**Uyarı**: MySQL zaten 3306 numaralı bağlantı noktasında çalışıyorsa, bu komut hata verecektir. Hata alırsanız, farklı bir bağlantı noktası deneyin.

**2**. Terminalden uygulamanın kaynak kodlarının olduğu dizine gidin ve gerekli node modüllerini yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```

Node modülleri yüklendikten sonra, veritabanını localinizde otomatik olarak kurmak için terminalinizde aşağıdaki komutu çalıştırın:

```bash
node db.js
```

**3**. Uygulamayı başlatmak için aşağıdaki komutu çalıştırın:

```bash
npm run start
```

**4**. Uygulama başlatıldıktan sonra `http://localhost:3000` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

---

# README (EN)

_Update: 18 August 2023_

You delivered the case to me on Wednesday, August 16 at 15:30, and I delivered the app to you on August 17 at 02:55, fulfilling the requirements you asked for, by texting the number you reached me at:

![image](https://i.hizliresim.com/f3nif5f.png)

This was not a problem in terms of running the application, but I wanted the application to be more extensible and customizable for ease of use, so I created an `.env` file to make it easier to customize the database operations. In this `.env` you can customize the socket port, http port and db information as you like (I wanted to add this in case you already have those ports in use, etc.).

In the first version of the README, I asked for Docker and MySQL requirements and I designed the README file to be suitable for a brand new computer owner, but later I wanted to change this because you might already have MySQL installed on your computer. For this reason, I also made a small update to the README file.

Now the `index.html` file is served as static via the express application. The `index.html` file depends on the `script.js` file to work properly. In the first line of the `script.js` file, the connection to the socket port is made. In the `.env` file the default socket port is `3001` and the HTTP port is `3000`. I also set the socket port in `script.js` to `3001`.

**WARNING: If you are going to use a different socket port in the `.env` file, you need to manually correct the port number in the `script.js` file.**

## Before You Start:

### Why didn't I choose TypeScript?

I use TypeScript in my own projects in order to detect errors that may arise in Production and to provide type-safety, but in this project I preferred JavaScript. Of course, TypeScript is actually a superset of JavaScript and therefore not independent of JavaScript, but it provides us with type-safety. But why didn't I choose TypeScript for this project? Actually, I started as a TypeScript project but then I gave up because this case was not complex enough to require type-safety. I would definitely choose TypeScript in more complex projects.

### Why did I choose vanilla JavaScript and DOM API instead of React?

The case you asked me for was not so complex that I needed to go into the front-end, because what it really wanted to measure was my mastery of the back-end. Also, using React would have meant running a separate "npm install" command. I love using React and the Next.js framework in my own projects and I write in React almost every day, but it would have been a bit "overkill" to choose React or any other JavaScript library for this case. For this reason, I prepared a client side with vanilla JavaScript via DOM API. Besides, the fact that it was in the form of "index.html" meant that it could be easily used by dragging and dropping it into the browser. Moreover, since we can serve the "index.html" file statically when the app is running, there was no point in using React.

---

## Requirements

- npm
- Node.js
- Docker
- MySQL

---

## Installation

**1.** If you don't have MySQL installed on your computer, you first need to install MySQL on your computer via Docker (if you don't have Docker on your computer, you need to install Docker first).

After installing Docker, you can run the following command from the terminal (if you already have MySQL installed, you can skip this step):

```bash
docker run -p 3306:3306 --name my_mysql_db -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest

```

**Warning**: If MySQL is already running on port 3306, this command will give an error. If you get an error, try a different port.

**2**. From the terminal, navigate to the directory with the source code of the application and run the following command to install the required node modules:

```bash
npm install
```

Once the Node modules are installed, run the following command in your terminal to automatically install the database on your local machine:

```bash
node db.js
```

**3**. Run the following command to start the application:

```bash
npm run start
```

**4**. Once the application is launched, you can go to `http://localhost:3000` and start using the application.
