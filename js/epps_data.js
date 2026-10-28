// Data EPPS (Edwards Personal Preference Schedule)
// Terdiri dari 225 Pasang Pernyataan, Norma Penilaian (1-4), Rumus Skoring, dan Interpretasi Psikologis

const EPPS_DATA = {
  questions: [{"no": 1, "a": "Saya suka menolong teman-teman saya, apabila mereka dalam kesulitan.", "b": "Saya ingin melakukan apa saja sebaik mungkin."}, {"no": 2, "a": "Saya ingin mengetahui bagimana pandangan orang-orang besar, mengenai berbagai masalah yang menarik perhatian saya.", "b": "Saya ingin menyelesaikan sesuatu yang sangat penting artinya."}, {"no": 3, "a": "Saya menghendaki bahwa setiap pekerjaan tulis saya teliti, rapi dan tersusun dengan baik.", "b": "Saya ingin menjadi seorang ahli yang diakui dalam suatu pekerjaan, jabatan atau bidang yang khusus."}, {"no": 4, "a": "Saya suka menceritakan cerita-cerita yang lucu dan lelucon-lelucon waktu pesta.", "b": "Saya ingin menulis roman atau sandiwara yang hebat."}, {"no": 5, "a": "Saya ingin dapat berbuat sekehendak hati saya.", "b": "Saya ingin bisa mengatakan bahwa saya telah melakukan dengan baik suatu pekerjaan yang sulit."}, {"no": 6, "a": "Saya ingin dapat memecahkan teka-teki dan persoalan-persoalan yang sukar bagi orang lain.", "b": "Saya suka mengikuti petunjuk-petunjuk dan melakukan apa yang diharapkan orang lain dari saya."}, {"no": 7, "a": "Saya ingin mengalami pembaharuan dan perubahan dalam kehidupan saya sehari-hari.", "b": "Saya suka menyatakan kepada atasan saya bahwa mereka telah melakukan sesuatu pekerjaan yang baik, apabila menurut pendapat saya memang demikian adanya."}, {"no": 8, "a": "Saya suka merencanakan dan mengatur detail-detail dari setiap pekerjaan yang harus saya lakukan.", "b": "Saya suka mengikuti petunjuk-petunjuk dan melakukan apa yang diharapkan orang dari diri saya."}, {"no": 9, "a": "Saya ingin orang-orang memperhatikan dan memberikan komentar mengenai penampilan saya di depan umum.", "b": "Saya suka membaca riwayat hidup orang-orang besar."}, {"no": 10, "a": "Saya suka mengelakkan situasi-situasi yang mengharapkan saya melakukan hal-hal dengan cara konvensional (kebiasaan yang umum dilakukan orang).", "b": "Saya suka membaca riwayat hidup orang-orang besar."}, {"no": 11, "a": "Saya ingin menjadi seorang ahli yang diakui dalam suatu pekerjaan, jabatan atau bidang khusus.", "b": "Sebelum memulai sesuatu pekerjaan saya ingin pekerjaan itu teratur dan terencanakan."}, {"no": 12, "a": "Saya ingin mengetahui bagaimana pandangan orang-orang besar/ahli, mengenai berbagai masalah yang menarik perhatian saya.", "b": "Jika saya akan bepergian, saya senang apabila segala sesuatunya telah direncanakan sebelumnya.."}, {"no": 13, "a": "Saya suka menyelesaikan setiap pekerjaan atau tugas yang telah saya mulai.", "b": "Saya ingin barang-barang saya tersusun rapi dan teratur di atas meja atau di dalam ruang kerja saya."}, {"no": 14, "a": "Saya suka bercerita kepada orang-orang lain tentang petualangan-petualangan saya dan hal-hal aneh yang pernah saya alami.", "b": "Saya suka makan saya teratur dan ada waktu-waktu tertentu untuk makan."}, {"no": 15, "a": "Saya ingin tidak tergantung dari orang lain dalam menentukan apa yang akan saya lakukan.", "b": "Saya ingin barang-barang saya tersusun rapi dan teratur di atas meja atau di dalam ruang kerja saya."}, {"no": 16, "a": "Saya ingin bisa mengerjakan segala sesuatu lebih baik daripada orang-orang lain.", "b": "Saya suka menceritakan cerita-cerita lucu dan lelucon-lelucon waktu pesta."}, {"no": 17, "a": "Saya suka mengikuti adat-istiadat dan menghindarkan melakukan hal-hal yang mungkin dianggap tidak wajar oleh orang-orang yang saya hormati.", "b": "Saya suka berbicara tentang hal-hal yang telah saya capai."}, {"no": 18, "a": "Saya ingin agar hidup saya teratur sedemikian rupa, sehingga berjalan lancar dan tanpa banyak perubahan-perubahan dalam rencana saya.", "b": "Saya suka bercerita kepada orang-orang lain tentang petualangan-petualangan saya dan hal-hal aneh yang pernah saya alami."}, {"no": 19, "a": "Saya suka membaca buku-buku dan sandiwara, terutama yang berkisar sekitar masalah seks.", "b": "Saya suka menjadi pusat perhatian, apabila saya ada di dalam suatu kelompok."}, {"no": 20, "a": "Saya suka mengecam orang-orang yang kedudukannya memegang kekuasaan.", "b": "Saya suka menggunakan kata-kata yang maknanya seringkali tidak diketahui oleh orang lain."}, {"no": 21, "a": "Saya suka menyelesaikan tugas-tugas yang dianggap orang lain sebagai tugas yang membutuhkan keterampilan dan usaha.", "b": "Saya ingin dapat berbuat sekehendak hati saya."}, {"no": 22, "a": "Saya suka memuji orang yang saya kagumi.", "b": "Saya ingin merasa bebas untuk melakukan apa yang saya kehendaki."}, {"no": 23, "a": "Saya suka menyimpan surat-surat, bon-bon, dan kertas-kertas lain secara tersusun rapi dan menurut sistem tertentu.", "b": "Saya ingin tidak tergantung dari orang lain dalam menentukan apa yang akan saya lakukan."}, {"no": 24, "a": "Saya suka mengajukan pertanyaan-pertanyaan yang menurut saya tidak seorangpun akan dapat menjawabnya.", "b": "Saya suka mengecam orang-orang yang kedudukannya memegang kekuasaan."}, {"no": 25, "a": "Saya menjadi sedemikian marahnya, sehingga rasanya ingin melemparkan dan merusak barang-barang.", "b": "Saya suka mengelakkan tanggung jawab dan kewajiban-kewajiban."}, {"no": 26, "a": "Saya ingin berhasil dalam apa yang saya lakukan.", "b": "Saya suka membuat teman-teman baru."}, {"no": 27, "a": "Saya suka mengikuti petunjuk-petunjuk dan melakukan apa yang diharapkan orang dari diri saya.", "b": "Saya ingin mempunyai ikatan perasaan yang kuat dengan teman teman saya."}, {"no": 28, "a": "Saya menghendaki bahwa setiap pekerjaan tulis saya teliti, rapi dan tersusun dengan baik.", "b": "Saya ingin membuat teman sebanyak mungkin."}, {"no": 29, "a": "Saya suka menceritakan cerita-cerita lucu dan lelucon-lelucon waktu pesta.", "b": "Saya suka berkirim surat pada teman-teman saya."}, {"no": 30, "a": "Saya ingin berbuat sekehendak hati saya.", "b": "Saya suka dalam melakukan atau menjalani segala sesuatu bersama-sama dengan teman-teman."}, {"no": 31, "a": "Saya ingin dapat memecahkan teka teki dan persoalan-persoalan yang sukar bagi orang lain.", "b": "Saya suka menilai orang berdasarkan sebab-sebab mengapa mereka melakukan sesuatu, bukan berdasar apa yang sesungguhnya mereka lakukan."}, {"no": 32, "a": "Saya suka menerima pimpinan dari orang-orang yang saya kagumi.", "b": "Saya ingin memahami bagimana perasaan teman-teman saya dalam menghadapi berbagai masalah."}, {"no": 33, "a": "Saya suka makan saya teratur dan ada waktu-waktu tertentu untuk makan.", "b": "Saya suka mempelajari dan menganalisa tingkah laku orang-orang lain."}, {"no": 34, "a": "Saya suka mengatakan hal yang dianggap lucu dan cerdas oleh orang lain.", "b": "Saya suka untuk menempatkan diri saya ditempat orang lain, dan membayangkan bagaimana perasaan saya apabila saya dalam keadaan atau situasi yang sama."}, {"no": 35, "a": "Saya ingin merasa bebas untuk melakukan apa yang saya kehendaki.", "b": "Saya suka mengamat-amati bagaimana perasaan orang lain dalam satu keadaan tertentu."}, {"no": 36, "a": "Saya suka menyelesaikan tugas-tugas yang dianggap orang lain sebagai tugas yang membutuhkan keterampilan dan usaha.", "b": "Saya ingin teman-teman saya memberi dorongan-dorongan kepada saya bila saya menghadapi kegagalan."}, {"no": 37, "a": "Dalam merencanakan sesuatu, saya ingin mendapat saran-saran dari orang-orang yang pendapatnya saya hormati.", "b": "Saya ingin diperlakukan dengan ramah oleh teman-teman saya."}, {"no": 38, "a": "Saya ingin agar hidup saya teratur sedemikian rupa sehingga berjalan lancar dan tanpa banyak perubahan-perubahan dalam rencana saya.", "b": "Saya ingin teman-teman saya merasa kasihan pada saya apabila saya sedang sakit."}, {"no": 39, "a": "Saya suka menjadi pusat perhatian, apabila syaa ada dalam suatu kelompok.", "b": "Saya ingin agar teman-teman saya meributkan tentang diri saya, apabila mendapatkan cedera atau sakit."}, {"no": 40, "a": "Saya suka mengelakkan situasi-situasi yang mengharapkan saya melakukan hal-hal dengan konvensional (kebiasaan yang umum dilakukan orang).", "b": "Saya ingin agar teman-teman saya bersimpati terhadap saya dan menghibur saya bila saya bersusah hati."}, {"no": 41, "a": "Saya ingin menulis roman atau sandiwara yang hebat.", "b": "Apabila saya bekerja dalam suatu panitia, saya ingin ditunjuk atau dipilih sebagai ketuanya."}, {"no": 42, "a": "Apabila saya berada dalam kelompok saya suka menerima pimpinan orang lain dalam memutuskan apa yang akan dilakukan oleh kelompok tersebut.", "b": "Sedapat mungkin saya ingin membimbing dan mengarahkan tindakan atau perbuatan orang lain."}, {"no": 43, "a": "Saya suka menyimpan surat-surat, bon-bon, dan kertas-kertas lainnya secara tersusun rapi dan menurut sistem tertentu.", "b": "Saya ingin menjadi salah seorang pemimpin dalam organisasi-organisasi atau kelompok-kelompok dimana saya menjadi anggotanya."}, {"no": 44, "a": "Saya suka mengajukan pertanyaan-pertanyaan yang menurut saya tidak seorangpun akan dapat menjawabnya.", "b": "Saya suka mengatakan pada orang-orang lain bagimana mereka harus melakukan pekerjaan mereka."}, {"no": 45, "a": "Saya suka mengelakkan tanggung jawab dan kewajiban-kewajiban.", "b": "Saya senang untuk diminta menyelesaikan pertentangan-pertentangan atau perselisihan-perselisihan."}, {"no": 46, "a": "Saya ingin menjadi ahli yang diakui dalam pekerjaan, jabatan atau bidang khusus.", "b": "Saya merasa bersalah, apabila saya telah melakukan sesuatu yang saya ketahui keliru."}, {"no": 47, "a": "Saya suka membaca riwayat orang-orang besar.", "b": "Saya merasa bahwa saya harus mengakui hal-hal yang telah saya lakukan dan saya anggap salah."}, {"no": 48, "a": "Saya suka merencanakan dan mengatur detail-detail dari setiap pekerjaan yang harus saya lakukan.", "b": "Bila keadaan kurang menguntungkan bagi saya, maka saya merasa bahwa saya harus lebih disalahkan daripada orang lain."}, {"no": 49, "a": "Saya suka menggunakan kata-kata yang maknanya seringkali tidak diketahui oleh orang lain.", "b": "Saya merasa bahwa dalam banyak hal, saya kalah bila dibandingkan dengan orang-orang lain."}, {"no": 50, "a": "Saya suka mengecam orang-orang yang kedudukannya memegang kekuasaan.", "b": "Saya merasa canggung ditengah-tengah orang-orang lain yang saya anggap sebagai atasan saya."}, {"no": 51, "a": "Saya suka melakukan pekerjaan apa saja terbaik mungkin.", "b": "Saya suka menolong orang-orang lain, yang tidak begitu beruntung apabila dibandingkan dengan keadaan saya."}, {"no": 52, "a": "Saya ingin mengetahui bagimana pandangan orang-orang besar mengenai berbagai masalah yang menarik perhatian saya.", "b": "Saya suka bermurah hati terhadap teman teman saya."}, {"no": 53, "a": "Saya suka membuat rencana sebelum memulai pekerjaan yang sulit.", "b": "Saya suka memberi pertolongan-pertolongan kecil kepada teman-teman saya."}, {"no": 54, "a": "Saya suka bercerita kepada orang-orang lain tentang petualangan-petualangan saya dan hal-hal aneh yang pernah saya alami.", "b": "Saya ingin teman-teman saya mempercayai saya dan menceritakan kesulitan-kesulitan mereka kepada saya."}, {"no": 55, "a": "Saya suka menyatakan pendapat saya tentang berbagai hal.", "b": "Saya suka memaafkan teman-teman saya yang menyakiti hati saya."}, {"no": 56, "a": "Saya ingin bisa mengerjakan segala sesuatu lebih baik daripada orang-orang lain.", "b": "Saya suka makan di restoran-restoran yang baru atau asing."}, {"no": 57, "a": "Saya suka mengikuti adat-istiadat dan menghindarkan melakukan hal-hal yang mungkin dianggap tidak wajar oleh orang-orang yang saya hormati.", "b": "Saya suka mengikuti mode-mode baru."}, {"no": 58, "a": "Sebelum memulai sesuatu pekerjaan saya ingin pekerjaan itu teratur dan terencanakan.", "b": "Saya suka bepergian melihat-lihat daerah pedalaman."}, {"no": 59, "a": "Saya ingin orang-orang memperhatikan dan memberikan komentar mengenai penampilan saya di depan umum.", "b": "Saya suka berkeliling di pedalaman dan tinggal di berbagai tempat."}, {"no": 60, "a": "Saya ingin tidak tergantung dari orang lain dalam menentukan apa yang akan saya lakukan.", "b": "Saya suka mengerjakan hal-hal yang baru dan berbeda-beda."}, {"no": 61, "a": "Saya ingin bisa mengatakan bahwa saya telah melakukan dengan baik suatu pekerjaan yang sulit.", "b": "Saya suka bekerja keras pada tiap pekerjaan yang saya hadapi."}, {"no": 62, "a": "Saya suka menyatakan kepada atasan saya bahwa mereka telah melakukan sesuatu pekerjaan yang baik, apabila menurut pendapat saya memang demikian keadaannya.", "b": "Saya ingin menyelesaikan pekerjaan satu-persatu sebelum memulai yang lainnya."}, {"no": 63, "a": "Jika saya akan bepergian, saya senang apabila segala sesuatunya telah direncanakan sebelumnya..", "b": "Saya suka mengerjakan teka-teki atau memecahkan persoalan-persoalan sampai selesai."}, {"no": 64, "a": "Saya kadang-kadang suka melakukan hal-hal hanya untuk melihat bagaimana pengaruhnya terhadap orang lain.", "b": "Saya suka bertahan menghadapi suatu pekerjaan atau masalah, sekalipun tampaknya seolah-olah saya tak akan berhasil."}, {"no": 65, "a": "Saya suka melakukan hal-hal yang dianggap orang lain tidak sesuai dengan adat kebiasaan.", "b": "Saya ingin bekerja berjam-jam tanpa diganggu."}, {"no": 66, "a": "Saya ingin menyelesaikan sesuatu yang sangat penting artinya.", "b": "Saya mempunyai keinginan untuk mencium orang yang menarik dari lawan jenis saya."}, {"no": 67, "a": "Saya suka memuji orang yang saya kagumi.", "b": "Saya ingin dianggap punya daya tarik fisik oleh orang-orang dari lawan jenis saya."}, {"no": 68, "a": "Saya ingin barang-barang saya tersusun rapi dan teratur di atas meja atau di dalam ruang kerja saya.", "b": "Saya mudah jatuh cinta pada seseorang dari lawan jenis saya."}, {"no": 69, "a": "Saya suka berbicara tentang hal-hal yang saya capai.", "b": "Saya suka mendengarkan atau menceritakan lelucon-lelucon yang terutama berkisar soal seks."}, {"no": 70, "a": "Saya ingin melakukan hal-hal dengan cara saya sendiri tanpa menghiraukan apa yang mungkin dipikirkan orang lain.", "b": "Saya suka membaca buku-buku dan sandiwara, terutama yang berkisar sekitar masalah seks."}, {"no": 71, "a": "Saya ingin menulis roman atau sandiwara yang hebat.", "b": "Saya suka menyerang pendirian-pendirian yang bertentangan dengan pendirian saya."}, {"no": 72, "a": "Apabila saya berada dalam kelompok saya suka menerima pimpinan orang lain dalam memutuskan apa yang akan dilakukan oleh kelompok tersebut.", "b": "Saya rasanya ingin mengecam seseorang di muka umum bila orang itu patut menerimanya."}, {"no": 73, "a": "Saya ingin agar hidup saya teratur sedemikian rupa, sehingga berjalan lancar dan tanpa banyak perubahan-perubahan dalam rencana saya.", "b": "Saya menjadi sedemikian marahnya, sehingga rasanya ingin melemparkan dan merusak barang-barang."}, {"no": 74, "a": "Saya suka mengajukan pertanyaan-pertanyaan yang menurut saya tidak seorangpun akan dapat menjawabnya.", "b": "Saya suka mengatakan kepada orang-orang lain bagimana pendapat saya mengenai mereka."}, {"no": 75, "a": "Saya suka mengelakkan tanggung jawab dan kewajiban-kewajiban.", "b": "Saya rasanya ingin memperolok-olok orang-orang yang melakukan hal-hal yang saya anggap bodoh."}, {"no": 76, "a": "Saya ingin loyal terhadap teman-teman saya.", "b": "Saya ingin melakukan pekerjaan apa saja sebaik mungkin."}, {"no": 77, "a": "Saya suka mengamat-amati bagaimana perasaan orang lain dalam suatu keadaan tertentu.", "b": "Saya ingin bisa mengatakan bahwa saya telah melakukan dengan baik sesuatu pekerjaan yang sulit."}, {"no": 78, "a": "Saya ingin teman-teman memberi dorongan kepada saya bila saya menghadapi kegagalan.", "b": "Saya ingin berhasil dalam apa yang saya lakukan."}, {"no": 79, "a": "Saya ingin menjadi salah seorang pemimpin dalam organisasi-organisasi atau kelompok-kelompok dimana saya menjadi anggotanya.", "b": "Saya ingin bisa mengerjakan segala sesuatu lebih baik daripada orang-orang lain."}, {"no": 80, "a": "Bila keadaan kurang menguntungkan bagi saya, maka saya merasa bahwa saya harus lebih disalahkan daripada orang lain.", "b": "Saya suka memecahkan teka teki dan persoalan-persoalan yang sukar bagi orang lain."}, {"no": 81, "a": "Saya suka melakukan sesuatu untuk teman-teman saya.", "b": "Dalam merencanakan sesuatu, saya ingin mendapat saran-saran dari orang-orang yang pendapatnya saya hormati."}, {"no": 82, "a": "Saya suka untuk menempatkan diri saya ditempat orang lain, dan membayangkan bagaimana perasaan saya apabila saya dalam keadaan atau situasi yang sama.", "b": "Saya suka menyatakan kepada atasan saya bahwa mereka telah melakukan sesuatu pekerjaan yang baik, apabila menurut pendapat saya memang demikian adanya."}, {"no": 83, "a": "Saya ingin agar teman-teman saya menunjukkan simpati dan pengertian bila saya mengalami kesukaran-kesukaran.", "b": "Saya suka menerima pempinan dari orang-orang yang saya kagumi."}, {"no": 84, "a": "Apabila saya bekerja dalam suatu panitia, saya ingin ditunjuk atau dipilih sebagai ketuanya.", "b": "Apabila saya berada dalam kelompok saya suka menerima pimpinan orang lain dalam memutuskan apa yang akan dilakukan oleh kelompok tersebut."}, {"no": 85, "a": "Apabila saya melakukan sesuatu hal yang salah, saya merasa bahwa untuk itu saya harus dihukum.", "b": "Saya suka mengikuti adat-istiadat dan menghindarkan melakukan hal-hal yang mungkin dianggap tidak wajar oleh orang-orang yang saya hormati."}, {"no": 86, "a": "Saya suka dalam melakukan atau menjalani segala sesuatu bersama-sama dengan teman-teman.", "b": "Saya suka membuat perencanaan sebelum mulai pekerjaan yang sulit."}, {"no": 87, "a": "Saya ingin memahami bagimana perasaan teman-teman saya dalam menghadapi berbagai masalah.", "b": "Jika saya akan bepergian, saya senang apabila segala sesuatunya telah direncanakan sebelumnya.."}, {"no": 88, "a": "Saya ingin diperlakukan dengan ramah oleh teman-teman saya.", "b": "Sebelum memulai sesuatu pekerjaan saya ingin pekerjaan itu teratur dan terencanakan."}, {"no": 89, "a": "Saya ingin dianggap sebagai pemimpin oleh orang-orang lain.", "b": "Saya suka menyimpan surat-surat, bon-bon, dan kertas-kertas lain secara tersusun rapi dan menurut sistem tertentu."}, {"no": 90, "a": "Saya merasa bahwa pilu hati dan kesusahan yang telah saya alami, lebih banyak membawa kebaikan daripada kerugian bagi saya.", "b": "Saya ingin agar hidup saya teratur sedemikian rupa, sehingga berjalan lancar dan tanpa banyak perubahan-perubahan dalam rencana saya."}, {"no": 91, "a": "Saya ingin mempunyai ikatan perasaan yang kuat dengan teman teman saya.", "b": "Saya suka mengatakan hal yang dianggap lucu dan cerdas oleh orang lain."}, {"no": 92, "a": "Saya suka merenungkan kepribadian teman-teman saya dan mencoba mengerti apa yang menyebabkan mereka mempunyai kepribadian yang demikian.", "b": "Saya kadang-kadang suka melakukan hal-hal hanya untuk melihat bagaimana pengaruhnya terhadap orang lain."}, {"no": 93, "a": "Saya ingin agar teman-teman saya meributkan tentang diri saya, apabila mendapatkan cedera atau sakit.", "b": "Saya suka berbicara tentang hal-hal yang telah saya capai."}, {"no": 94, "a": "Saya suka mengatakan pada orang-orang lain bagimana mereka harus melakukan pekerjaan mereka.", "b": "Saya suka menjadi pusat perhatian, apabila saya ada di dalam suatu kelompok."}, {"no": 95, "a": "Saya merasa canggung ditengah-tengah orang-orang lain yang saya anggap sebagai atasan saya.", "b": "Saya suka menggunakan kata-kata yang maknanya seringkali tidak diketahui oleh orang lain."}, {"no": 96, "a": "Saya lebih suka mengerjakan sesuatu bersama-sama dengan teman-teman saya daripada sendirian.", "b": "Saya suka menyatakan pendapat saya tentang berbagai hal."}, {"no": 97, "a": "Saya suka mempelajari dan menganalisa tingkah laku orang-orang lain.", "b": "Saya suka melakukan hal-hal yang dianggap orang lain tidak sesuai dengan adat kebiasaan."}, {"no": 98, "a": "Saya ingin teman-teman saya merasa kasihan pada saya apabila saya sedang sakit.", "b": "Saya suka mengelakkan situasi-situasi yang mengharapkan saya melakukan hal-hal dengan cara konvensional (kebiasaan yang umum dilakukan orang)."}, {"no": 99, "a": "Sedapat mungkin saya ingin membimbing dan mengarahkan tindakan atau perbuatan orang lain.", "b": "Saya ingin melakukan hal-hal dengan cara saya sendiri tanpa menghiraukan apa yang mungkin dipikirkan orang lain."}, {"no": 100, "a": "Saya merasa bahwa dalam banyak hal, saya kalah bila dibandingkan dengan orang-orang lain.", "b": "Saya suka mengelakkan tanggung jawab dan kewajiban-kewajiban."}, {"no": 101, "a": "Saya ingin berhasil dalam apa yang saya lakukan.", "b": "Saya suka membuat teman-teman baru."}, {"no": 102, "a": "Saya suka menganalisa perasaan-perasaan saya dan sebab-sebab mengapa saya melakukan sesuatu.", "b": "Saya ingin melakukan sesuatu untuk teman-teman saya."}, {"no": 103, "a": "Saya ingin agar teman-teman saya membantu saya bila saya mengalami kesulitan.", "b": "Saya suka melakukan sesuatu untuk teman-teman saya."}, {"no": 104, "a": "Saya suka memperdebatkan pendirian saya bila diserang oleh orang-orang lain.", "b": "Saya suka berkirim surat kepada teman-teman saya."}, {"no": 105, "a": "Saya merasa bersalah, apabila saya telah melakukan sesuatu yang saya ketahui keliru.", "b": "Saya ingin mempunyai ikatan perasaan yang kuat dengan teman teman saya."}, {"no": 106, "a": "Saya suka dalam melakukan atau menjalani segala sesuatu bersama-sama dengan teman-teman.", "b": "Saya suka menganalisa perasaan-perasaan saya dan sebab-sebab mengapa saya melakukan sesuatu."}, {"no": 107, "a": "Saya suka menerima pimpinan dari orang-orang yang saya kagumi.", "b": "Saya ingin memahami bagimana perasaan teman-teman saya dalam menghadapi berbagai masalah."}, {"no": 108, "a": "Saya ingin agar teman-teman saya dengan gembira memberikan pertolongan-pertolongan kecil kepada saya.", "b": "Saya suka menilai orang berdasarkan sebab-sebab mengapa mereka melakukan sesuatu, bukan berdasar apa yang sesungguhnya mereka lakukan."}, {"no": 109, "a": "Bila saya berada dalam suatu kelompok, saya ingin menentukan apa yang akan kami kerjakan.", "b": "Saya suka meramalkan bagimana teman-teman saya akan bertindak dalam berbagai situasi."}, {"no": 110, "a": "Saya lebih suka mengalah dan menghindarkan perkelahian daripada memaksakan kemauan saya.", "b": "Saya suka menganalisa perasaan-perasaan orang lain dan sebab-sebab mengapa mereka melakukan sesuatu."}, {"no": 111, "a": "Saya suka membuat teman-teman baru.", "b": "Saya ingin agar teman-teman saya membantu saya bila saya mengalami kesulitan."}, {"no": 112, "a": "Saya suka menilai orang berdasarkan sebab-sebab mengapa mereka melakukan sesuatu, bukan berdasar apa yang sesungguhnya mereka lakukan.", "b": "Saya ingin teman-teman saya banyak menujukkan rasa sayang mereka terhadap saya."}, {"no": 113, "a": "Saya ingin agar hidup saya teratur sedemikian rupa, sehingga berjalan lancar dan tanpa banyak perubahan-perubahan dalam rencana saya.", "b": "Saya ingin teman-teman saya merasa kasihan pada saya apabila saya sedang sakit."}, {"no": 114, "a": "Saya senang untuk diminta menyelesaikan pertentangan-pertentangan atau perselisihan-perselisihan.", "b": "Saya ingin agar teman-teman saya dengan gembira memberikan pertolongan-pertolongan kecil kepada saya."}, {"no": 115, "a": "Saya merasa bahwa saya harus mengakui hal-hal yang telah saya lakukan dan saya anggap salah.", "b": "Saya ingin agar teman-teman saya bersimpati terhadap saya dan menghibur saya bila saya bersusah hati."}, {"no": 116, "a": "Saya lebih suka mengerjakan sesuatu bersama-sama dengan teman-teman saya daripada sendirian.", "b": "Saya suka memperdebatkan pendirian saya bila diserang oleh orang-orang lain."}, {"no": 117, "a": "Saya suka merenungkan kepribadian teman-teman saya dan mencoba mengerti apa yang menyebabkan mereka mempunyai kepribadian yang demikian.", "b": "Saya ingin dapat membujuk dan mempengaruhi orang lain untuk melakukan apa yang saya kehendaki."}, {"no": 118, "a": "Saya ingin agar teman-teman saya bersimpati terhadap saya dan menghibur saya bila saya bersusah hati.", "b": "Bila saya berada dalam suatu kelompok, saya ingin menentukan apa yang akan kami kerjakan."}, {"no": 119, "a": "Saya suka mengajukan pertanyaan-pertanyaan yang menurut saya tidak seorangpun akan dapat menjawabnya.", "b": "Saya suka menyatakan kepada orang lain bagaimana mereka harus melakukan pekerjaan mereka."}, {"no": 120, "a": "Saya merasa canggung ditengah-tengah orang-orang lain yang saya anggap sebagai atasan saya.", "b": "Sedapat mungkin saya ingin membimbing dan mengarahkan tindakan atau perbuatan orang lain."}, {"no": 121, "a": "Saya suka bergaul dalam kelompok yang para anggotanya akrab dan bersahabat satu sama lainnya.", "b": "Saya merasa bersalah, apabila saya telah melakukan sesuatu yang saya ketahui keliru."}, {"no": 122, "a": "Saya suka menganalisa perasaan-perasaan orang lain dan sebab-sebab mengapa mereka melakukan sesuatu.", "b": "Saya merasa sedih akan ketidakmampuan saya untuk menghadapi berbagai macam keadaan."}, {"no": 123, "a": "Saya ingin teman-teman saya merasa kasihan pada saya apabila saya sedang sakit.", "b": "Saya lebih suka mengalah dan menghindarkan perkelahian daripada memaksakan kemauan saya."}, {"no": 124, "a": "Saya ingin dapat membujuk dan mempengaruhi orang lain untuk melakukan apa yang saya kehendaki.", "b": "Saya merasa sedih akan ketidakmampuan saya untuk menghadapi berbagai macam keadaan."}, {"no": 125, "a": "Saya suka mengecam orang-orang yang kedudukannya memegang kekuasaan.", "b": "Saya merasa canggung ditengah-tengah orang-orang lain yang saya anggap sebagai atasan saya."}, {"no": 126, "a": "Saya suka bergaul dalam kelompok yang para anggotanya akrab dan bersahabat satu sama lainnya.", "b": "Saya suka menolong teman-teman saya, apabila mereka dalam kesulitan."}, {"no": 127, "a": "Saya suka menganalisa perasaan-perasaan saya dan sebab-sebab mengapa saya melakukan sesuatu.", "b": "Saya suka menunjukkan simpati saya kepada teman-teman saya bila mereka mendapat cedera atau sakit."}, {"no": 128, "a": "Saya ingin agar teman-teman saya membantu saya bila saya mengalami kesulitan.", "b": "Saya suka memperlakukan orang lain dengan ramah dan simpatik."}, {"no": 129, "a": "Saya ingin menjadi salah seorang pemimpin dalam organisasi-organisasi kelompok yang saya masuki.", "b": "Saya suka menunjukkan simpati saya kepada teman-teman saya bila mereka mendapat cedera atau sakit."}, {"no": 130, "a": "Saya merasa bahwa pilu hati dan kesusahan yang telah saya alami, lebih banyak membawa kebaikan daripada kerugian bagi saya.", "b": "Saya suka berlaku ramah tehadap teman-teman saya."}, {"no": 131, "a": "Saya lebih suka mengerjakan sesuatu bersama-sama dengan teman-teman saya daripada sendirian.", "b": "Saya suka bereksperimen dalam mencoba hal-hal yang baru."}, {"no": 132, "a": "Saya suka merenungkan kepribadian teman-teman saya dan mencoba mengerti apa yang menyebabkan mereka mempunyai kepribadian yang demikian.", "b": "Saya suka mencoba pekerjaan yang baru dan berbeda-beda, daripada melakukan pekerjaan yang sama dan terus menerus."}, {"no": 133, "a": "Saya ingin agar teman-teman saya menunjukkan simpati dan pengertian bila saya mengalami kesukaran-kesukaran.", "b": "Saya suka bertemu dengan orang-orang baru."}, {"no": 134, "a": "Saya suka memperdebatkan pendirian saya bila diserang oleh orang-orang lain.", "b": "Saya ingin mengalami pembaharuan dan perubahan dalam kehidupan saya sehari hari."}, {"no": 135, "a": "Saya lebih suka mengalah dan menghindarkan perkelahian daripada memaksakan kemauan saya.", "b": "Saya suka berkeliling di pedalaman dan tinggal di berbagai tempat."}, {"no": 136, "a": "Saya suka melakukan sesuatu untuk teman-teman saya.", "b": "Bila saya harus melakukan suatu tugas, saya ingin mengerjakannya sampai selesai."}, {"no": 137, "a": "Saya suka menganalisa perasaan-perasaan orang lain dan sebab-sebab mengapa mereka melakukan sesuatu.", "b": "Saya ingin menghindarkan gangguan bila saya sedang bekerja."}, {"no": 138, "a": "Saya suka memberi pertolongan-pertolongan kecil kepada teman-teman saya.", "b": "Saya suka bekerja sampai jauh malam untuk menyelesaikan suatu pekerjaan."}, {"no": 139, "a": "Saya ingin dianggap sebagai pemimpin oleh orang-orang lain.", "b": "Saya ingin bekerja berjam-jam tanpa diganggu."}, {"no": 140, "a": "Apabila saya melakukan sesuatu hal yang salah, saya merasa bahwa untuk itu saya harus dihukum.", "b": "Saya suka bertahan menghadapi suatu pekerjaan atau masalah, sekalipun tampaknya seolah-olah saya tak akan berhasil."}, {"no": 141, "a": "Saya ingin loyal terhadap teman-teman saya.", "b": "Saya suka bepergian dengan lawan jenis saya yang menarik (bagi laki-laki dengan wanita;bagi wanita dengan laki-laki)."}, {"no": 142, "a": "Saya suka meramalkan bagaimana teman-teman saya akan bertindak dalam berbagai situasi.", "b": "Saya suka ikut serta dalam diskusi-diskusi tentang seks dan aktifitas seksuil."}, {"no": 143, "a": "Saya ingin teman teman saya menunjukkan rasa sayang mereka terhadap saya.", "b": "Saya suka nafsu saya terangsang."}, {"no": 144, "a": "Bila saya berada dalam suatu kelompok, saya ingin menentukan apa yang akan kami kerjakan.", "b": "Saya suka ikut dalam aktivitas-aktivitas sosial bersama-sama dengan orang-orang dari lawan jenis saya."}, {"no": 145, "a": "Saya merasa sedih akan ketidakmampuan saya untuk menghadapi berbagai macam keadaan.", "b": "Saya suka membaca buku-buku dan sandiwara, terutama yang berkisar sekitar masalah seks."}, {"no": 146, "a": "Saya suka berkirim surat kepada teman-teman saya.", "b": "Sayas suka membaca berita-berita surat kabar tentang pembunuhan-pembunuhan dan lain-lain perbuatan kekerasan."}, {"no": 147, "a": "Saya suka meramalkan bagimana teman-teman saya akan bertindak dalam berbagai situasi.", "b": "Saya suka menyerang pendirian-pendirian yang bertentangan dengan pendirian saya."}, {"no": 148, "a": "Saya ingin agar teman-teman saya meributkan tentang diri saya, apabila mendapatkan cedera atau sakit.", "b": "Saya rasanya ingin menyalahkan orang lain bila keadaannya kurang menguntungkan saya."}, {"no": 149, "a": "Saya suka menyatakan kepada orang lain bagaimana mereka harus melakukan pekerjaan mereka.", "b": "Rasa rasanya ingin membalas dendam bila seseorang menghina saya."}, {"no": 150, "a": "Saya merasa bahwa dalam banyak hal, saya kalah bila dibandingkan dengan orang-orang lain.", "b": "Saya rasanya ingin menghardik orang lain bila saya berbeda pendapat dengan mereka."}, {"no": 151, "a": "Saya suka menolong teman-teman saya, apabila mereka dalam kesulitan.", "b": "Saya suka melakukan pekerjaan apa saja sebaik mungkin."}, {"no": 152, "a": "Saya suka bepergian melihat-lihat daerah pedalaman.", "b": "Saya suka menyelesaikan tugas-tugas yang dianggap orang lain sebagai tugas yang membutuhkan keterampilan dan usaha."}, {"no": 153, "a": "Saya suka bekerja keras pada tiap pekerjaan yang saya hadapi.", "b": "Saya ingin menyelesaikan sesuatu yang sangat penting artinya."}, {"no": 154, "a": "Saya suka bepergian dengan lawan jenis saya yang menarik (bagi laki-laki dengan wanita;bagi wanita dengan laki-laki).", "b": "Saya ingin berhasil dalam apa yang saya lakukan."}, {"no": 155, "a": "Sayas suka membaca berita-berita surat kabar tentang pembunuhan-pembunuhan dan lain-lain perbuatan kekerasan.", "b": "Saya ingin menulis roman atau sandiwara yang hebat."}, {"no": 156, "a": "Saya suka memberi pertolongan-pertolongan kecil kepada teman-teman saya.", "b": "Dalam merencanakan sesuatu, saya ingin mendapat saran-saran dari orang-orang yang pendapatnya saya hormati."}, {"no": 157, "a": "Saya ingin mengalami pembaharuan dan perubahan dalam kehidupan saya sehari-hari.", "b": "Saya suka menyatakan kepada atasan saya bahwa mereka telah melakukan sesuatu pekerjaan yang baik, apabila menurut pendapat saya memang demikian adanya."}, {"no": 158, "a": "Saya suka bekerja sampai jauh malam untuk menyelesaikan suatu pekerjaan.", "b": "Saya suka memuji orang yang saya kagumi."}, {"no": 159, "a": "Saya suka nafsu saya terangsang.", "b": "Saya suka menerima pimpinan dari orang-orang yang saya kagumi."}, {"no": 160, "a": "Rasa rasanya ingin membalas dendam bila seseorang menghina saya.", "b": "Apabila saya berada dalam kelompok saya suka menerima pimpinan orang lain dalam memutuskan apa yang akan dilakukan oleh kelompok tersebut."}, {"no": 161, "a": "Saya suka bermurah hati terhadap teman-teman saya.", "b": "Saya suka membuat rencana sebelum memulai pekerjaan yang sulit."}, {"no": 162, "a": "Saya suka bertemu dengan orang-orang baru.", "b": "Saya menghendaki bahwa setiap pekerjaan tulis saya teliti, rapi dan tersusun dengan baik."}, {"no": 163, "a": "Saya suka menyelesaikan setiap pekerjaan atau tugas yang telah saya mulai.", "b": "Saya ingin barang-barang saya tersusun rapi dan teratur di atas meja atau di dalam ruang kerja saya."}, {"no": 164, "a": "Saya ingin dianggap punya daya tarik fisik oleh orang-orang dari lawan jenis saya.", "b": "Saya suka merencanakan dan mengatur detail-detail dari setiap pekerjaan yang harus saya lakukan."}, {"no": 165, "a": "Saya suka mengatakan kepada orang-orang lain bagaimana pendapat saya mengenai mereka.", "b": "Saya suka makan saya teratur dan ada waktu-waktu tertentu untuk makan."}, {"no": 166, "a": "Saya suka berlaku ramah tehadap teman-teman saya.", "b": "Saya suka mengatakan hal yang dianggap lucu dan cerdas oleh orang lain."}, {"no": 167, "a": "Saya suka mencoba pekerjaan yang baru dan berbeda-beda, daripada melakukan pekerjaan yang sama dan terus menerus.", "b": "Saya kadang-kadang suka melakukan hal-hal hanya untuk melihat bagaimana pengaruhnya terhadap orang lain."}, {"no": 168, "a": "Saya suka bertahan menghadapi suatu pekerjaan atau masalah, sekalipun tampaknya seolah-olah saya tak akan berhasil.", "b": "Saya ingin orang-orang memperhatikan dan memberikan komentar mengenai penampilan saya di depan umum."}, {"no": 169, "a": "Saya suka membaca buku-buku dan sandiwara, terutama yang berkisar sekitar masalah seks.", "b": "Saya suka menjadi pusat perhatian, apabila saya ada di dalam suatu kelompok."}, {"no": 170, "a": "Saya rasanya ingin menyalahkan orang lain bila keadaannya kurang menguntungkan saya.", "b": "Saya suka mengajukan pertanyaan-pertanyaan yang menurut saya tidak seorangpun akan dapat menjawabnya."}, {"no": 171, "a": "Saya suka menunjukkan simpati saya kepada teman-teman saya bila mereka mendapat cedera atau sakit.", "b": "Saya suka mengatakan pendapat saya tentang berbagai hal."}, {"no": 172, "a": "Saya suka makan di restoran-restoran yang baru atau asing.", "b": "Saya suka melakukan hal-hal yang dianggap orang lain tidak sesuai dengan adat kebiasaan."}, {"no": 173, "a": "Saya ingin menyelesaikan pekerjaan satu persatu sebelum memulai yang lain.", "b": "Saya ingin merasa bebas untuk melakukan apa yang saya kehendaki."}, {"no": 174, "a": "Saya suka ikut serta dalam diskusi-diskusi tentang seks dan aktifitas seksuil.", "b": "Saya ingin melakukan hal-hal dengan cara saya sendiri tanpa menghiraukan apa yang mungkin dipikirkan orang lain."}, {"no": 175, "a": "Saya menjadi sedemikian marahnya, sehingga rasanya ingin melemparkan dan merusak barang-barang.", "b": "Saya suka mengelakkan tanggung jawab dan kewajiban-kewajiban."}, {"no": 176, "a": "Saya suka menolong teman-teman saya, apabila mereka dalam kesulitan.", "b": "Saya ingin loyal terhadap teman-teman saya."}, {"no": 177, "a": "Saya suka mengerjakan hal-hal yang baru dan berbeda-beda.", "b": "Saya suka membuat teman teman baru."}, {"no": 178, "a": "Bila saya harus melakukan suatu tugas, saya ingin mengerjakannya sampai selesai.", "b": "Saya suka bergaul dalam kelompok yang para anggotanya akrab dan bersahabat satu sama lainnya."}, {"no": 179, "a": "Saya suka bepergian dengan lawan jenis saya yang menarik (bagi laki-laki dengan wanita;bagi wanita dengan laki-laki).", "b": "Saya ingin membuat teman sebanyak mungkin."}, {"no": 180, "a": "Saya suka menyerang pendirian-pendirian yang bertentangan dengan pendirian saya.", "b": "Saya suka berkirim surat pada teman-teman saya."}, {"no": 181, "a": "Saya suka bermurah hati terhadap teman teman saya.", "b": "Saya suka mengamat-amati bagaimana perasaan orang lain dalam satu keadaan tertentu."}, {"no": 182, "a": "Saya suka makan di restoran-restoran yang baru atau asing.", "b": "Saya suka untuk menempatkan diri saya ditempat orang lain, dan membayangkan bagaimana perasaan saya apabila saya dalam keadaan atau situasi yang sama."}, {"no": 183, "a": "Saya suka bekerja sampai jauh malam untuk menyelesaikan suatu pekerjaan.", "b": "Saya ingin memahami bagaimana perasaan teman-teman saya dalam menghadapi berbagai masalah."}, {"no": 184, "a": "Saya suka nafsu saya terangsang.", "b": "Saya suka mempelajari dan menganalisa tingkah laku orang-orang lain."}, {"no": 185, "a": "Saya rasanya ingin memperolok-olok orang-orang yang melakukan hal-hal yang saya anggap bodoh.", "b": "Saya suka meramalkan bagimana teman-teman saya akan bertindak dalam berbagai situasi."}, {"no": 186, "a": "Saya suka memaafkan teman-teman saya yang menyakiti hati saya.", "b": "Saya ingin teman-teman saya memberi dorongan-dorongan kepada saya bila saya menghadapi kegagalan."}, {"no": 187, "a": "Saya suka bereksperimen dalam mencoba hal-hal yang baru.", "b": "Saya ingin agar teman-teman saya menunjukkan simpati dan pengertian bila saya mengalami kesukaran-kesukaran."}, {"no": 188, "a": "Saya suka mengerjakan teka-teki atau memecahkan persoalan-persoalan sampai selesai.", "b": "Saya ingin diperlakukan dengan ramah oleh teman-teman saya."}, {"no": 189, "a": "Saya ingin dianggap punya daya tarik fisik oleh orang-orang dari lawan jenis saya.", "b": "Saya ingin teman-teman saya banyak menujukkan rasa sayang mereka terhadap saya."}, {"no": 190, "a": "Saya rasanya ingin mengecam seseorang di muka umum bila orang itu patut menerimanya.", "b": "Saya ingin agar teman-teman saya meributkan tentang diri saya, apabila mendapatkan cedera atau sakit."}, {"no": 191, "a": "Saya suka berlaku ramah tehadap teman-teman saya.", "b": "Saya ingin dianggap sebagai pemimpin oleh orang-orang lain."}, {"no": 192, "a": "Saya lebih suka mencoba pekerjaan-pekerjaan yang baru dan lain daripada terus menerus melakukan pekerjaan yang sama.", "b": "Apabila saya bekerja dalam suatu panitia, saya ingin ditunjuk atau dipilih sebagai ketuanya."}, {"no": 193, "a": "Saya suka menyelesaikan setiap pekerjaan atau tugas yang telah saya mulai.", "b": "Saya ingin dapat membujuk dan mempengaruhi orang lain untuk melakukan apa yang saya kehendaki."}, {"no": 194, "a": "Saya suka ikut serta dalam diskusi-diskusi tentang seks dan aktifitas seksuil.", "b": "Saya senang untuk diminta menyelesaikan pertentangan-pertentangan atau perselisihan-perselisihan."}, {"no": 195, "a": "Saya menjadi sedemikian marahnya, sehingga rasanya ingin melemparkan dan merusak barang-barang.", "b": "Saya suka menyatakan kepada orang lain bagaimana mereka harus melakukan pekerjaan mereka."}, {"no": 196, "a": "Saya suka berlaku sangat ramah terhadap teman teman saya.", "b": "Bila keadaan kurang menguntungkan bagi saya, maka saya merasa bahwa saya harus lebih disalahkan daripada orang lain."}, {"no": 197, "a": "Saya suka berkeliling di pedalaman dan tinggal di berbagai tempat.", "b": "Apabila saya melakukan sesuatu hal yang salah, saya merasa bahwa untuk itu saya harus dihukum."}, {"no": 198, "a": "Saya suka bertahan menghadapi suatu pekerjaan atau masalah, sekalipun tampaknya seolah-olah saya tak akan berhasil.", "b": "Saya merasa bahwa pilu hati dan kesusahan yang telah saya alami, lebih banyak membawa kebaikan daripada kerugian bagi saya."}, {"no": 199, "a": "Saya suka membaca buku-buku dan sandiwara, terutama yang berkisar sekitar masalah seks.", "b": "Saya merasa bahwa saya harus mengakui hal-hal yang telah saya lakukan dan saya anggap salah."}, {"no": 200, "a": "Saya rasanya ingin menyalahkan orang lain bila keadaannya kurang menguntungkan saya.", "b": "Saya merasa bahwa dalam banyak hal, saya kalah bila dibandingkan dengan orang-orang lain."}, {"no": 201, "a": "Saya suka melakukan pekerjaan apa saja terbaik mungkin.", "b": "Saya suka menolong orang-orang lain, yang tidak begitu beruntung apabila dibandingkan dengan keadaan saya."}, {"no": 202, "a": "Saya suka mengerjakan hal-hal yang baru dan berbeda-beda.", "b": "Saya suka memperlakukan orang lain dengan ramah dan simpatik."}, {"no": 203, "a": "Bila saya harus melakukan suatu tugas, saya ingin mengerjakannya sampai selesai.", "b": "Saya suka menolong orang-orang lain, yang tidak begitu beruntung apabila dibandingkan dengan keadaan saya."}, {"no": 204, "a": "Saya suka ikut dalam aktivitas-aktivitas sosial bersama-sama dengan orang-orang dari lawan jenis saya.", "b": "Saya suka memaafkan teman-teman saya yang menyakiti hati saya."}, {"no": 205, "a": "Saya suka menyerang pendirian-pendirian yang bertentangan dengan pendirian saya.", "b": "Saya ingin teman-teman saya mempercayai saya dan menceritakan kesulitan-kesulitan mereka kepada saya."}, {"no": 206, "a": "Saya suka memperlakukan orang lain dengan ramah dan simpatik.", "b": "Saya suka bepergian melihat-lihat daerah pedalaman."}, {"no": 207, "a": "Saya suka mengikuti adat-istiadat dan menghindarkan melakukan hal-hal yang mungkin dianggap tidak wajar oleh orang-orang yang saya hormati.", "b": "Saya suka mengikuti mode baru."}, {"no": 208, "a": "Saya suka bekerja keras pada tiap pekerjaan yang saya hadapi.", "b": "Saya ingin mengalami pembaharuan dan perubahan dalam kehidupan saya sehari-hari."}, {"no": 209, "a": "Saya mempunyai keinginan untuk mencium orang yang menarik dari lawan jenis saya.", "b": "Saya suka bereksperimen dalam mencoba hal-hal yang baru."}, {"no": 210, "a": "Saya rasanya ingin menghardik orang lain bila saya berbeda pendapat dengan mereka.", "b": "Saya suka mengikuti mode-mode baru."}, {"no": 211, "a": "Saya suka menolong orang-orang lain, yang tidak begitu beruntung apabila dibandingkan dengan keadaan saya.", "b": "Saya suka menyelesaikan setiap pekerjaan atau tugas yang telah saya mulai."}, {"no": 212, "a": "Saya suka berkeliling di pedalaman dan tinggal di berbagai tempat.", "b": "Saya ingin bekerja berjam-jam tanpa diganggu."}, {"no": 213, "a": "Jika saya akan bepergian, saya senang apabila segala sesuatunya telah direncanakan sebelumnya..", "b": "Saya suka mengerjakan teka-teki dan memcahkan persoalan-persoalan sampai selesai."}, {"no": 214, "a": "Saya mudah jatuh cinta pada seseorang dari lawan jenis saya.", "b": "Saya ingin menyelesaikan pekerjaan satu persatu sebelum memulai yang lain."}, {"no": 215, "a": "Saya suka mengatakan kepada orang-orang lain bagimana pendapat saya mengenai mereka.", "b": "Saya ingin menghindarkan diganggu bila saya sedang bekerja."}, {"no": 216, "a": "Saya suka memberi pertolongan-pertolongan kecil kepada teman-teman saya.", "b": "Saya suka ikut dalam aktivitas-aktivitas sosial bersama-sama dengan orang-orang dari lawan jenis saya."}, {"no": 217, "a": "Saya suka bertemu dengan orang-orang baru.", "b": "Saya mempunyai keinginan untuk mencium orang yang menarik dari lawan jenis saya."}, {"no": 218, "a": "Saya ingin mengerjakan teka-teki atau memecahkan persoalan-persoalan sampai selesai.", "b": "Saya mudah jatuh cinta pada seseorang dari lawan jenis saya."}, {"no": 219, "a": "Saya suka berbicara tentang hal-hal yang telah saya capai.", "b": "Saya suka mendengarkan atau menceritakan lelucon-lelucon yang terutama berkisar soal seks."}, {"no": 220, "a": "Saya rasanya ingin memperolok orang-orang yang melakukan hal-hal yang saya anggap bodoh.", "b": "Saya suka mendengarkan atau menceritakan lelucon-lelucon yang terutama berkisar soal seks."}, {"no": 221, "a": "Saya ingin teman-teman saya mempercayai saya dan menceritakan kesulitan-kesulitan mereka kepada saya.", "b": "Sayas suka membaca berita-berita surat kabar tentang pembunuhan-pembunuhan dan lain-lain perbuatan kekerasan."}, {"no": 222, "a": "Saya suka mengikuti mode baru.", "b": "Saya rasanya ingin mengecam seseorang di muka umum bila orang itu patut menerimanya."}, {"no": 223, "a": "Saya ingin menghindarkan diganggu bila saya sedang bekerja.", "b": "Saya rasanya ingin menghardik orang lain bila saya berbeda pendapat dengan mereka."}, {"no": 224, "a": "Saya suka mendengarkan atau menceritakan lelucon-lelucon yang terutama berkisar soal seks.", "b": "Rasa rasanya ingin membalas dendam bila seseorang menghina saya."}, {"no": 225, "a": "Saya suka mengelakkan tanggung jawab dan kewajiban-kewajiban.", "b": "Saya rasanya ingin memperolok-olok orang-orang yang melakukan hal-hal yang saya anggap bodoh."}],
  factors: {
  "ach": {
    "name": "Achievement",
    "code": "ach",
    "desc": "Kebutuhan untuk berprestasi dan sukses dalam tugas sulit",
    "icon": "trophy"
  },
  "def": {
    "name": "Deference",
    "code": "def",
    "desc": "Kebutuhan untuk mentaati perintah dan menghormati aturan",
    "icon": "check-square"
  },
  "ord": {
    "name": "Order",
    "code": "ord",
    "desc": "Kebutuhan untuk bekerja secara teratur, rapi, dan terencana",
    "icon": "list-ordered"
  },
  "exh": {
    "name": "Exhibition",
    "code": "exh",
    "desc": "Kebutuhan untuk menonjolkan diri dan menjadi pusat perhatian",
    "icon": "sparkles"
  },
  "aut": {
    "name": "Autonomy",
    "code": "aut",
    "desc": "Kebutuhan untuk mandiri dan bebas membuat keputusan sendiri",
    "icon": "compass"
  },
  "aff": {
    "name": "Affiliation",
    "code": "aff",
    "desc": "Kebutuhan untuk bersekutu dan menjalin pertemanan erat",
    "icon": "users"
  },
  "int": {
    "name": "Intraception",
    "code": "int",
    "desc": "Kebutuhan untuk memahami perasaan dan motif tingkah laku manusia",
    "icon": "brain"
  },
  "suc": {
    "name": "Succorance",
    "code": "suc",
    "desc": "Kebutuhan untuk menerima bantuan, simpati, dan dorongan orang lain",
    "icon": "heart-handshake"
  },
  "dom": {
    "name": "Dominance",
    "code": "dom",
    "desc": "Kebutuhan untuk memimpin, mempengaruhi, dan mengarahkan orang lain",
    "icon": "shield-star"
  },
  "aba": {
    "name": "Abasement",
    "code": "aba",
    "desc": "Kebutuhan untuk mengalah, intropeksi diri, dan mengakui kesalahan",
    "icon": "user-check"
  },
  "nur": {
    "name": "Nurturance",
    "code": "nur",
    "desc": "Kebutuhan untuk menolong, bermurah hati, dan menyenangkan orang lain",
    "icon": "gift"
  },
  "chg": {
    "name": "Change",
    "code": "chg",
    "desc": "Kebutuhan akan pengalaman baru, variasi, dan pembaruan hidup",
    "icon": "refresh-cw"
  },
  "end": {
    "name": "Endurance",
    "code": "end",
    "desc": "Kebutuhan akan ketekunan, daya tahan, dan menyelesaikan tugas sampai tuntas",
    "icon": "zap"
  },
  "het": {
    "name": "Heterosexual",
    "code": "het",
    "desc": "Kebutuhan akan pergaulan, daya tarik, dan interaksi dengan lawan jenis",
    "icon": "heart"
  },
  "agg": {
    "name": "Aggression",
    "code": "agg",
    "desc": "Kebutuhan untuk menyerang pendirian yang berbeda dan kritis berargumentasi",
    "icon": "flame"
  }
},
  factorList: ["ach", "def", "ord", "exh", "aut", "aff", "int", "suc", "dom", "aba", "nur", "chg", "end", "het", "agg"],
  questionEffects: {
  "1": {
    "a": null,
    "b": null
  },
  "2": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "3": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "4": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "5": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "6": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "7": {
    "a": null,
    "b": null
  },
  "8": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "9": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "10": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "11": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "12": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "13": {
    "a": null,
    "b": null
  },
  "14": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "15": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "16": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "17": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "18": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "19": {
    "a": null,
    "b": null
  },
  "20": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "21": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "22": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "23": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "24": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "25": {
    "a": null,
    "b": null
  },
  "26": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "27": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "28": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "29": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "30": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "31": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "32": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "33": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "34": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "35": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "36": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "37": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "38": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "39": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "40": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "41": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "42": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "43": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "44": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "45": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "46": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "47": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "48": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "49": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "50": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "51": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "52": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "53": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "54": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "55": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "56": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "57": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "58": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "59": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "60": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "61": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "62": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "63": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "64": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "65": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "66": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "67": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "68": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "69": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "70": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "71": {
    "a": {
      "factor": "ach",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "72": {
    "a": {
      "factor": "def",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "73": {
    "a": {
      "factor": "ord",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "74": {
    "a": {
      "factor": "exh",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "75": {
    "a": {
      "factor": "aut",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "76": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "77": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "78": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "79": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "80": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "81": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "82": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "83": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "84": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "85": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "86": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "87": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "88": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "89": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "90": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "91": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "92": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "93": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "94": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "95": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "96": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "97": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "98": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "99": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "100": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "101": {
    "a": null,
    "b": null
  },
  "102": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "103": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "104": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "105": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "106": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "107": {
    "a": null,
    "b": null
  },
  "108": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "109": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "110": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "111": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "112": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "113": {
    "a": null,
    "b": null
  },
  "114": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "115": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "116": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "117": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "118": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "119": {
    "a": null,
    "b": null
  },
  "120": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "121": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "122": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "123": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "124": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "125": {
    "a": null,
    "b": null
  },
  "126": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "127": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "128": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "129": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "130": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "131": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "132": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "133": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "134": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "135": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "136": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "137": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "138": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "139": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "140": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "141": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "142": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "143": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "144": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "145": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "146": {
    "a": {
      "factor": "aff",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "147": {
    "a": {
      "factor": "int",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "148": {
    "a": {
      "factor": "suc",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "149": {
    "a": {
      "factor": "dom",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "150": {
    "a": {
      "factor": "aba",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "151": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "152": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "153": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "154": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "155": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "ach",
      "type": "c"
    }
  },
  "156": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "157": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "158": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "159": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "160": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "def",
      "type": "c"
    }
  },
  "161": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "162": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "163": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "164": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "165": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "ord",
      "type": "c"
    }
  },
  "166": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "167": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "168": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "169": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "170": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "exh",
      "type": "c"
    }
  },
  "171": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "172": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "173": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "174": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "175": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "aut",
      "type": "c"
    }
  },
  "176": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "177": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "178": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "179": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "180": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "aff",
      "type": "c"
    }
  },
  "181": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "182": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "183": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "184": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "185": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "int",
      "type": "c"
    }
  },
  "186": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "187": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "188": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "189": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "190": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "suc",
      "type": "c"
    }
  },
  "191": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "192": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "193": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "194": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "195": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "dom",
      "type": "c"
    }
  },
  "196": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "197": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "198": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "199": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "200": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "aba",
      "type": "c"
    }
  },
  "201": {
    "a": null,
    "b": null
  },
  "202": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "203": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "204": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "205": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "nur",
      "type": "c"
    }
  },
  "206": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "207": {
    "a": null,
    "b": null
  },
  "208": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "209": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "210": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "chg",
      "type": "c"
    }
  },
  "211": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "212": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "213": {
    "a": null,
    "b": null
  },
  "214": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "215": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "end",
      "type": "c"
    }
  },
  "216": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "217": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "218": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "219": {
    "a": null,
    "b": null
  },
  "220": {
    "a": {
      "factor": "agg",
      "type": "r"
    },
    "b": {
      "factor": "het",
      "type": "c"
    }
  },
  "221": {
    "a": {
      "factor": "nur",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "222": {
    "a": {
      "factor": "chg",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "223": {
    "a": {
      "factor": "end",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "224": {
    "a": {
      "factor": "het",
      "type": "r"
    },
    "b": {
      "factor": "agg",
      "type": "c"
    }
  },
  "225": {
    "a": null,
    "b": null
  }
},
  consistencyPairs: [
  {
    "q1": 1,
    "q2": 151
  },
  {
    "q1": 7,
    "q2": 157
  },
  {
    "q1": 13,
    "q2": 163
  },
  {
    "q1": 19,
    "q2": 169
  },
  {
    "q1": 25,
    "q2": 175
  },
  {
    "q1": 26,
    "q2": 101
  },
  {
    "q1": 32,
    "q2": 107
  },
  {
    "q1": 38,
    "q2": 113
  },
  {
    "q1": 44,
    "q2": 119
  },
  {
    "q1": 50,
    "q2": 125
  },
  {
    "q1": 51,
    "q2": 201
  },
  {
    "q1": 57,
    "q2": 207
  },
  {
    "q1": 63,
    "q2": 213
  },
  {
    "q1": 69,
    "q2": 219
  },
  {
    "q1": 75,
    "q2": 225
  }
],
  norms: {
  "1": {
    "name": "College Student (Men)",
    "scores": {
      "0": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": null,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": null,
        "agg": null,
        "con": null
      },
      "1": {
        "ach": null,
        "def": null,
        "ord": 1,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": 1,
        "dom": null,
        "aba": 1,
        "nur": null,
        "chg": null,
        "end": null,
        "het": null,
        "agg": null,
        "con": null
      },
      "2": {
        "ach": null,
        "def": null,
        "ord": 3,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": 2,
        "dom": null,
        "aba": 2,
        "nur": null,
        "chg": null,
        "end": 1,
        "het": null,
        "agg": 1,
        "con": null
      },
      "3": {
        "ach": null,
        "def": 1,
        "ord": 6,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": 5,
        "dom": null,
        "aba": 3,
        "nur": 1,
        "chg": null,
        "end": 3,
        "het": null,
        "agg": 2,
        "con": null
      },
      "4": {
        "ach": null,
        "def": 3,
        "ord": 9,
        "exh": null,
        "aut": 1,
        "aff": 1,
        "int": null,
        "suc": 9,
        "dom": 1,
        "aba": 5,
        "nur": 2,
        "chg": 1,
        "end": 6,
        "het": 1,
        "agg": 3,
        "con": null
      },
      "5": {
        "ach": null,
        "def": 6,
        "ord": 14,
        "exh": null,
        "aut": 2,
        "aff": 2,
        "int": 1,
        "suc": 13,
        "dom": 2,
        "aba": 9,
        "nur": 3,
        "chg": 2,
        "end": 10,
        "het": 2,
        "agg": 6,
        "con": null
      },
      "6": {
        "ach": 1,
        "def": 10,
        "ord": 19,
        "exh": 1,
        "aut": 3,
        "aff": 3,
        "int": 4,
        "suc": 20,
        "dom": 3,
        "aba": 12,
        "nur": 6,
        "chg": 3,
        "end": 13,
        "het": 3,
        "agg": 9,
        "con": 1
      },
      "7": {
        "ach": 2,
        "def": 16,
        "ord": 27,
        "exh": 3,
        "aut": 6,
        "aff": 4,
        "int": 5,
        "suc": 27,
        "dom": 4,
        "aba": 18,
        "nur": 10,
        "chg": 5,
        "end": 18,
        "het": 5,
        "agg": 13,
        "con": 3
      },
      "8": {
        "ach": 4,
        "def": 23,
        "ord": 36,
        "exh": 6,
        "aut": 11,
        "aff": 7,
        "int": 9,
        "suc": 34,
        "dom": 5,
        "aba": 24,
        "nur": 13,
        "chg": 7,
        "end": 24,
        "het": 6,
        "agg": 17,
        "con": 6
      },
      "9": {
        "ach": 7,
        "def": 34,
        "ord": 46,
        "exh": 9,
        "aut": 15,
        "aff": 11,
        "int": 13,
        "suc": 42,
        "dom": 8,
        "aba": 31,
        "nur": 18,
        "chg": 10,
        "end": 29,
        "het": 9,
        "agg": 24,
        "con": 15
      },
      "10": {
        "ach": 10,
        "def": 43,
        "ord": 54,
        "exh": 15,
        "aut": 22,
        "aff": 16,
        "int": 17,
        "suc": 50,
        "dom": 9,
        "aba": 38,
        "nur": 24,
        "chg": 15,
        "end": 37,
        "het": 12,
        "agg": 32,
        "con": 27
      },
      "11": {
        "ach": 16,
        "def": 52,
        "ord": 63,
        "exh": 21,
        "aut": 38,
        "aff": 21,
        "int": 19,
        "suc": 58,
        "dom": 13,
        "aba": 45,
        "nur": 31,
        "chg": 20,
        "end": 44,
        "het": 14,
        "agg": 40,
        "con": 46
      },
      "12": {
        "ach": 22,
        "def": 63,
        "ord": 71,
        "exh": 28,
        "aut": 34,
        "aff": 28,
        "int": 25,
        "suc": 65,
        "dom": 17,
        "aba": 53,
        "nur": 7,
        "chg": 28,
        "end": 51,
        "het": 19,
        "agg": 47,
        "con": 68
      },
      "13": {
        "ach": 30,
        "def": 73,
        "ord": 78,
        "exh": 37,
        "aut": 43,
        "aff": 36,
        "int": 32,
        "suc": 72,
        "dom": 21,
        "aba": 61,
        "nur": 46,
        "chg": 33,
        "end": 57,
        "het": 3,
        "agg": 57,
        "con": 86
      },
      "14": {
        "ach": 40,
        "def": 81,
        "ord": 84,
        "exh": 49,
        "aut": 52,
        "aff": 45,
        "int": 39,
        "suc": 78,
        "dom": 27,
        "aba": 67,
        "nur": 55,
        "chg": 41,
        "end": 64,
        "het": 27,
        "agg": 65,
        "con": 96
      },
      "15": {
        "ach": 50,
        "def": 88,
        "ord": 88,
        "exh": 62,
        "aut": 61,
        "aff": 54,
        "int": 45,
        "suc": 83,
        "dom": 32,
        "aba": 75,
        "nur": 63,
        "chg": 50,
        "end": 69,
        "het": 32,
        "agg": 72,
        "con": 99
      },
      "16": {
        "ach": 58,
        "def": 93,
        "ord": 92,
        "exh": 72,
        "aut": 68,
        "aff": 64,
        "int": 51,
        "suc": 87,
        "dom": 38,
        "aba": 79,
        "nur": 70,
        "chg": 57,
        "end": 75,
        "het": 39,
        "agg": 77,
        "con": 99
      },
      "17": {
        "ach": 66,
        "def": 96,
        "ord": 95,
        "exh": 81,
        "aut": 76,
        "aff": 72,
        "int": 57,
        "suc": 90,
        "dom": 45,
        "aba": 84,
        "nur": 75,
        "chg": 64,
        "end": 79,
        "het": 45,
        "agg": 84,
        "con": 99
      },
      "18": {
        "ach": 74,
        "def": 98,
        "ord": 96,
        "exh": 89,
        "aut": 82,
        "aff": 79,
        "int": 64,
        "suc": 93,
        "dom": 54,
        "aba": 88,
        "nur": 82,
        "chg": 71,
        "end": 85,
        "het": 53,
        "agg": 88,
        "con": 99
      },
      "19": {
        "ach": 83,
        "def": 99,
        "ord": 97,
        "exh": 93,
        "aut": 86,
        "aff": 84,
        "int": 72,
        "suc": 95,
        "dom": 63,
        "aba": 92,
        "nur": 86,
        "chg": 78,
        "end": 89,
        "het": 59,
        "agg": 92,
        "con": 99
      },
      "20": {
        "ach": 86,
        "def": 99,
        "ord": 99,
        "exh": 97,
        "aut": 91,
        "aff": 89,
        "int": 78,
        "suc": 97,
        "dom": 73,
        "aba": 94,
        "nur": 90,
        "chg": 84,
        "end": 92,
        "het": 67,
        "agg": 95,
        "con": 99
      },
      "21": {
        "ach": 91,
        "def": 99,
        "ord": 99,
        "exh": 98,
        "aut": 94,
        "aff": 93,
        "int": 84,
        "suc": 98,
        "dom": 79,
        "aba": 97,
        "nur": 94,
        "chg": 89,
        "end": 94,
        "het": 73,
        "agg": 97,
        "con": 99
      },
      "22": {
        "ach": 95,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 96,
        "aff": 96,
        "int": 89,
        "suc": 98,
        "dom": 85,
        "aba": 99,
        "nur": 96,
        "chg": 93,
        "end": 96,
        "het": 81,
        "agg": 98,
        "con": 99
      },
      "23": {
        "ach": 98,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 98,
        "aff": 98,
        "int": 93,
        "suc": 98,
        "dom": 91,
        "aba": 99,
        "nur": 98,
        "chg": 97,
        "end": 98,
        "het": 89,
        "agg": 99,
        "con": 99
      },
      "24": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 95,
        "suc": 98,
        "dom": 94,
        "aba": 99,
        "nur": 99,
        "chg": 98,
        "end": 99,
        "het": 90,
        "agg": 99,
        "con": 99
      },
      "25": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 97,
        "suc": 98,
        "dom": 98,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 93,
        "agg": 99,
        "con": 99
      },
      "26": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 98,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 96,
        "agg": 99,
        "con": 99
      },
      "27": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 98,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      },
      "28": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 98,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      }
    }
  },
  "2": {
    "name": "College Student (Women)",
    "scores": {
      "0": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": null,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": null,
        "agg": null,
        "con": null
      },
      "1": {
        "ach": null,
        "def": null,
        "ord": 1,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": null,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": null,
        "agg": 1,
        "con": null
      },
      "2": {
        "ach": null,
        "def": null,
        "ord": 3,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": null,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": 1,
        "het": 1,
        "agg": 2,
        "con": null
      },
      "3": {
        "ach": 1,
        "def": 1,
        "ord": 5,
        "exh": null,
        "aut": 1,
        "aff": null,
        "int": null,
        "suc": 1,
        "dom": 1,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": 3,
        "het": 2,
        "agg": 5,
        "con": null
      },
      "4": {
        "ach": 2,
        "def": 2,
        "ord": 9,
        "exh": null,
        "aut": 3,
        "aff": null,
        "int": null,
        "suc": 3,
        "dom": 2,
        "aba": 1,
        "nur": null,
        "chg": null,
        "end": 5,
        "het": 3,
        "agg": 9,
        "con": null
      },
      "5": {
        "ach": 3,
        "def": 3,
        "ord": 14,
        "exh": null,
        "aut": 6,
        "aff": null,
        "int": null,
        "suc": 6,
        "dom": 3,
        "aba": 2,
        "nur": 1,
        "chg": 1,
        "end": 9,
        "het": 5,
        "agg": 14,
        "con": null
      },
      "6": {
        "ach": 5,
        "def": 6,
        "ord": 20,
        "exh": 1,
        "aut": 9,
        "aff": null,
        "int": null,
        "suc": 9,
        "dom": 5,
        "aba": 4,
        "nur": 2,
        "chg": 2,
        "end": 13,
        "het": 8,
        "agg": 21,
        "con": 1
      },
      "7": {
        "ach": 8,
        "def": 9,
        "ord": 28,
        "exh": 3,
        "aut": 13,
        "aff": 1,
        "int": 1,
        "suc": 13,
        "dom": 9,
        "aba": 7,
        "nur": 2,
        "chg": 3,
        "end": 18,
        "het": 11,
        "agg": 27,
        "con": 2
      },
      "8": {
        "ach": 13,
        "def": 14,
        "ord": 37,
        "exh": 6,
        "aut": 20,
        "aff": 2,
        "int": 3,
        "suc": 18,
        "dom": 11,
        "aba": 11,
        "nur": 3,
        "chg": 4,
        "end": 24,
        "het": 15,
        "agg": 36,
        "con": 4
      },
      "9": {
        "ach": 19,
        "def": 21,
        "ord": 46,
        "exh": 10,
        "aut": 28,
        "aff": 3,
        "int": 5,
        "suc": 25,
        "dom": 17,
        "aba": 14,
        "nur": 6,
        "chg": 7,
        "end": 30,
        "het": 19,
        "agg": 44,
        "con": 11
      },
      "10": {
        "ach": 27,
        "def": 29,
        "ord": 55,
        "exh": 15,
        "aut": 36,
        "aff": 4,
        "int": 9,
        "suc": 33,
        "dom": 23,
        "aba": 19,
        "nur": 9,
        "chg": 10,
        "end": 36,
        "het": 24,
        "agg": 51,
        "con": 24
      },
      "11": {
        "ach": 36,
        "def": 41,
        "ord": 64,
        "exh": 21,
        "aut": 45,
        "aff": 7,
        "int": 12,
        "suc": 44,
        "dom": 28,
        "aba": 25,
        "nur": 14,
        "chg": 13,
        "end": 44,
        "het": 31,
        "agg": 60,
        "con": 43
      },
      "12": {
        "ach": 47,
        "def": 50,
        "ord": 70,
        "exh": 30,
        "aut": 53,
        "aff": 12,
        "int": 16,
        "suc": 51,
        "dom": 36,
        "aba": 31,
        "nur": 20,
        "chg": 17,
        "end": 50,
        "het": 38,
        "agg": 66,
        "con": 63
      },
      "13": {
        "ach": 58,
        "def": 62,
        "ord": 77,
        "exh": 42,
        "aut": 62,
        "aff": 17,
        "int": 22,
        "suc": 59,
        "dom": 42,
        "aba": 37,
        "nur": 26,
        "chg": 21,
        "end": 57,
        "het": 45,
        "agg": 74,
        "con": 83
      },
      "14": {
        "ach": 64,
        "def": 73,
        "ord": 83,
        "exh": 52,
        "aut": 70,
        "aff": 24,
        "int": 28,
        "suc": 67,
        "dom": 51,
        "aba": 45,
        "nur": 32,
        "chg": 28,
        "end": 63,
        "het": 52,
        "agg": 79,
        "con": 96
      },
      "15": {
        "ach": 72,
        "def": 80,
        "ord": 88,
        "exh": 63,
        "aut": 77,
        "aff": 32,
        "int": 35,
        "suc": 76,
        "dom": 59,
        "aba": 51,
        "nur": 41,
        "chg": 35,
        "end": 69,
        "het": 57,
        "agg": 84,
        "con": 99
      },
      "16": {
        "ach": 79,
        "def": 85,
        "ord": 91,
        "exh": 73,
        "aut": 82,
        "aff": 41,
        "int": 43,
        "suc": 81,
        "dom": 67,
        "aba": 58,
        "nur": 50,
        "chg": 42,
        "end": 76,
        "het": 63,
        "agg": 89,
        "con": 99
      },
      "17": {
        "ach": 84,
        "def": 91,
        "ord": 94,
        "exh": 82,
        "aut": 87,
        "aff": 50,
        "int": 49,
        "suc": 86,
        "dom": 74,
        "aba": 66,
        "nur": 58,
        "chg": 52,
        "end": 80,
        "het": 69,
        "agg": 92,
        "con": 99
      },
      "18": {
        "ach": 90,
        "def": 95,
        "ord": 96,
        "exh": 88,
        "aut": 92,
        "aff": 58,
        "int": 58,
        "suc": 90,
        "dom": 83,
        "aba": 74,
        "nur": 66,
        "chg": 59,
        "end": 85,
        "het": 76,
        "agg": 95,
        "con": 99
      },
      "19": {
        "ach": 93,
        "def": 98,
        "ord": 97,
        "exh": 92,
        "aut": 96,
        "aff": 68,
        "int": 66,
        "suc": 93,
        "dom": 87,
        "aba": 81,
        "nur": 74,
        "chg": 68,
        "end": 90,
        "het": 81,
        "agg": 97,
        "con": 99
      },
      "20": {
        "ach": 96,
        "def": 99,
        "ord": 98,
        "exh": 96,
        "aut": 97,
        "aff": 77,
        "int": 73,
        "suc": 96,
        "dom": 92,
        "aba": 86,
        "nur": 82,
        "chg": 73,
        "end": 93,
        "het": 87,
        "agg": 98,
        "con": 99
      },
      "21": {
        "ach": 97,
        "def": 99,
        "ord": 99,
        "exh": 97,
        "aut": 98,
        "aff": 84,
        "int": 80,
        "suc": 98,
        "dom": 95,
        "aba": 90,
        "nur": 87,
        "chg": 81,
        "end": 95,
        "het": 91,
        "agg": 98,
        "con": 99
      },
      "22": {
        "ach": 98,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 90,
        "int": 85,
        "suc": 99,
        "dom": 98,
        "aba": 93,
        "nur": 91,
        "chg": 85,
        "end": 97,
        "het": 94,
        "agg": 99,
        "con": 99
      },
      "23": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 94,
        "int": 90,
        "suc": 99,
        "dom": 99,
        "aba": 96,
        "nur": 95,
        "chg": 90,
        "end": 99,
        "het": 96,
        "agg": 99,
        "con": 99
      },
      "24": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 96,
        "int": 94,
        "suc": 99,
        "dom": 99,
        "aba": 98,
        "nur": 97,
        "chg": 94,
        "end": 99,
        "het": 97,
        "agg": 99,
        "con": 99
      },
      "25": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 98,
        "int": 97,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 96,
        "end": 99,
        "het": 98,
        "agg": 99,
        "con": 99
      },
      "26": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      },
      "27": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      },
      "28": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      }
    }
  },
  "3": {
    "name": "General Adult (Men)",
    "scores": {
      "0": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": null,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": 5,
        "agg": null,
        "con": null
      },
      "1": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": 1,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": 10,
        "agg": null,
        "con": null
      },
      "2": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": 2,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": 15,
        "agg": null,
        "con": null
      },
      "3": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": 4,
        "dom": 1,
        "aba": 1,
        "nur": null,
        "chg": 1,
        "end": null,
        "het": 20,
        "agg": 1,
        "con": null
      },
      "4": {
        "ach": null,
        "def": null,
        "ord": 1,
        "exh": 1,
        "aut": 1,
        "aff": null,
        "int": 1,
        "suc": 8,
        "dom": 2,
        "aba": 2,
        "nur": null,
        "chg": 2,
        "end": null,
        "het": 24,
        "agg": 2,
        "con": null
      },
      "5": {
        "ach": 1,
        "def": 1,
        "ord": 3,
        "exh": 3,
        "aut": 2,
        "aff": 1,
        "int": 2,
        "suc": 13,
        "dom": 3,
        "aba": 4,
        "nur": 1,
        "chg": 4,
        "end": 1,
        "het": 29,
        "agg": 5,
        "con": null
      },
      "6": {
        "ach": 2,
        "def": 2,
        "ord": 5,
        "exh": 5,
        "aut": 3,
        "aff": 3,
        "int": 4,
        "suc": 19,
        "dom": 6,
        "aba": 6,
        "nur": 2,
        "chg": 6,
        "end": 2,
        "het": 33,
        "agg": 8,
        "con": 1
      },
      "7": {
        "ach": 4,
        "def": 4,
        "ord": 8,
        "exh": 9,
        "aut": 7,
        "aff": 5,
        "int": 6,
        "suc": 26,
        "dom": 9,
        "aba": 9,
        "nur": 5,
        "chg": 10,
        "end": 3,
        "het": 37,
        "agg": 11,
        "con": 3
      },
      "8": {
        "ach": 6,
        "def": 8,
        "ord": 11,
        "exh": 14,
        "aut": 10,
        "aff": 8,
        "int": 10,
        "suc": 33,
        "dom": 14,
        "aba": 12,
        "nur": 7,
        "chg": 14,
        "end": 5,
        "het": 42,
        "agg": 16,
        "con": 8
      },
      "9": {
        "ach": 10,
        "def": 12,
        "ord": 15,
        "exh": 22,
        "aut": 15,
        "aff": 12,
        "int": 15,
        "suc": 42,
        "dom": 19,
        "aba": 17,
        "nur": 11,
        "chg": 18,
        "end": 7,
        "het": 45,
        "agg": 22,
        "con": 17
      },
      "10": {
        "ach": 15,
        "def": 18,
        "ord": 20,
        "exh": 29,
        "aut": 21,
        "aff": 18,
        "int": 21,
        "suc": 50,
        "dom": 25,
        "aba": 21,
        "nur": 15,
        "chg": 24,
        "end": 10,
        "het": 50,
        "agg": 29,
        "con": 29
      },
      "11": {
        "ach": 21,
        "def": 25,
        "ord": 26,
        "exh": 37,
        "aut": 29,
        "aff": 24,
        "int": 28,
        "suc": 58,
        "dom": 31,
        "aba": 27,
        "nur": 20,
        "chg": 31,
        "end": 13,
        "het": 544,
        "agg": 37,
        "con": 48
      },
      "12": {
        "ach": 29,
        "def": 32,
        "ord": 33,
        "exh": 47,
        "aut": 37,
        "aff": 31,
        "int": 36,
        "suc": 65,
        "dom": 37,
        "aba": 33,
        "nur": 26,
        "chg": 38,
        "end": 18,
        "het": 58,
        "agg": 46,
        "con": 70
      },
      "13": {
        "ach": 37,
        "def": 42,
        "ord": 40,
        "exh": 57,
        "aut": 46,
        "aff": 39,
        "int": 44,
        "suc": 71,
        "dom": 44,
        "aba": 41,
        "nur": 33,
        "chg": 46,
        "end": 23,
        "het": 62,
        "agg": 54,
        "con": 87
      },
      "14": {
        "ach": 46,
        "def": 52,
        "ord": 47,
        "exh": 66,
        "aut": 54,
        "aff": 48,
        "int": 53,
        "suc": 77,
        "dom": 50,
        "aba": 49,
        "nur": 40,
        "chg": 54,
        "end": 29,
        "het": 66,
        "agg": 62,
        "con": 97
      },
      "15": {
        "ach": 56,
        "def": 62,
        "ord": 55,
        "exh": 75,
        "aut": 62,
        "aff": 58,
        "int": 61,
        "suc": 83,
        "dom": 57,
        "aba": 56,
        "nur": 47,
        "chg": 62,
        "end": 37,
        "het": 69,
        "agg": 69,
        "con": 99
      },
      "16": {
        "ach": 65,
        "def": 71,
        "ord": 63,
        "exh": 82,
        "aut": 70,
        "aff": 67,
        "int": 69,
        "suc": 87,
        "dom": 63,
        "aba": 62,
        "nur": 55,
        "chg": 70,
        "end": 44,
        "het": 73,
        "agg": 76,
        "con": 99
      },
      "17": {
        "ach": 74,
        "def": 79,
        "ord": 71,
        "exh": 87,
        "aut": 77,
        "aff": 75,
        "int": 77,
        "suc": 91,
        "dom": 69,
        "aba": 69,
        "nur": 63,
        "chg": 76,
        "end": 52,
        "het": 76,
        "agg": 82,
        "con": 99
      },
      "18": {
        "ach": 81,
        "def": 86,
        "ord": 77,
        "exh": 92,
        "aut": 84,
        "aff": 81,
        "int": 82,
        "suc": 93,
        "dom": 75,
        "aba": 75,
        "nur": 70,
        "chg": 82,
        "end": 59,
        "het": 80,
        "agg": 87,
        "con": 99
      },
      "19": {
        "ach": 86,
        "def": 91,
        "ord": 83,
        "exh": 95,
        "aut": 88,
        "aff": 87,
        "int": 87,
        "suc": 95,
        "dom": 80,
        "aba": 81,
        "nur": 76,
        "chg": 87,
        "end": 67,
        "het": 82,
        "agg": 91,
        "con": 99
      },
      "20": {
        "ach": 91,
        "def": 95,
        "ord": 88,
        "exh": 97,
        "aut": 92,
        "aff": 91,
        "int": 92,
        "suc": 96,
        "dom": 85,
        "aba": 86,
        "nur": 81,
        "chg": 91,
        "end": 74,
        "het": 85,
        "agg": 94,
        "con": 99
      },
      "21": {
        "ach": 94,
        "def": 97,
        "ord": 91,
        "exh": 98,
        "aut": 95,
        "aff": 94,
        "int": 95,
        "suc": 98,
        "dom": 89,
        "aba": 91,
        "nur": 86,
        "chg": 94,
        "end": 81,
        "het": 87,
        "agg": 96,
        "con": 99
      },
      "22": {
        "ach": 97,
        "def": 98,
        "ord": 94,
        "exh": 99,
        "aut": 97,
        "aff": 97,
        "int": 97,
        "suc": 98,
        "dom": 91,
        "aba": 94,
        "nur": 90,
        "chg": 96,
        "end": 86,
        "het": 89,
        "agg": 97,
        "con": 99
      },
      "23": {
        "ach": 98,
        "def": 99,
        "ord": 96,
        "exh": 99,
        "aut": 98,
        "aff": 98,
        "int": 98,
        "suc": 99,
        "dom": 95,
        "aba": 96,
        "nur": 93,
        "chg": 97,
        "end": 90,
        "het": 91,
        "agg": 98,
        "con": 99
      },
      "24": {
        "ach": 99,
        "def": 99,
        "ord": 98,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 97,
        "aba": 98,
        "nur": 96,
        "chg": 98,
        "end": 94,
        "het": 93,
        "agg": 99,
        "con": 99
      },
      "25": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 98,
        "aba": 99,
        "nur": 98,
        "chg": 99,
        "end": 97,
        "het": 95,
        "agg": 99,
        "con": 99
      },
      "26": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 98,
        "het": 97,
        "agg": 99,
        "con": 99
      },
      "27": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 98,
        "agg": 99,
        "con": 99
      },
      "28": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      }
    }
  },
  "4": {
    "name": "General Adult (Women)",
    "scores": {
      "0": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": null,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": 10,
        "agg": null,
        "con": null
      },
      "1": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": null,
        "dom": null,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": 17,
        "agg": null,
        "con": null
      },
      "2": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": null,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": null,
        "dom": 1,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": 24,
        "agg": 2,
        "con": null
      },
      "3": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": 1,
        "aut": null,
        "aff": null,
        "int": null,
        "suc": 1,
        "dom": 4,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": 30,
        "agg": 4,
        "con": null
      },
      "4": {
        "ach": null,
        "def": null,
        "ord": null,
        "exh": 2,
        "aut": 2,
        "aff": null,
        "int": null,
        "suc": 2,
        "dom": 9,
        "aba": null,
        "nur": null,
        "chg": null,
        "end": null,
        "het": 37,
        "agg": 9,
        "con": null
      },
      "5": {
        "ach": 1,
        "def": 1,
        "ord": 1,
        "exh": 5,
        "aut": 4,
        "aff": null,
        "int": null,
        "suc": 5,
        "dom": 15,
        "aba": 1,
        "nur": null,
        "chg": 1,
        "end": 1,
        "het": 42,
        "agg": 14,
        "con": null
      },
      "6": {
        "ach": 3,
        "def": 2,
        "ord": 3,
        "exh": 9,
        "aut": 8,
        "aff": null,
        "int": 1,
        "suc": 8,
        "dom": 22,
        "aba": 2,
        "nur": null,
        "chg": 2,
        "end": 2,
        "het": 48,
        "agg": 20,
        "con": null
      },
      "7": {
        "ach": 5,
        "def": 3,
        "ord": 4,
        "exh": 15,
        "aut": 13,
        "aff": 1,
        "int": 3,
        "suc": 12,
        "dom": 32,
        "aba": 4,
        "nur": 1,
        "chg": 3,
        "end": 3,
        "het": 53,
        "agg": 29,
        "con": 2
      },
      "8": {
        "ach": 9,
        "def": 5,
        "ord": 6,
        "exh": 23,
        "aut": 20,
        "aff": 2,
        "int": 5,
        "suc": 17,
        "dom": 40,
        "aba": 5,
        "nur": 2,
        "chg": 6,
        "end": 5,
        "het": 58,
        "agg": 38,
        "con": 5
      },
      "9": {
        "ach": 15,
        "def": 9,
        "ord": 9,
        "exh": 32,
        "aut": 28,
        "aff": 3,
        "int": 8,
        "suc": 24,
        "dom": 49,
        "aba": 7,
        "nur": 3,
        "chg": 9,
        "end": 7,
        "het": 63,
        "agg": 46,
        "con": 12
      },
      "10": {
        "ach": 21,
        "def": 14,
        "ord": 14,
        "exh": 42,
        "aut": 36,
        "aff": 5,
        "int": 12,
        "suc": 30,
        "dom": 56,
        "aba": 11,
        "nur": 4,
        "chg": 13,
        "end": 11,
        "het": 66,
        "agg": 55,
        "con": 25
      },
      "11": {
        "ach": 30,
        "def": 19,
        "ord": 19,
        "exh": 51,
        "aut": 45,
        "aff": 7,
        "int": 18,
        "suc": 38,
        "dom": 64,
        "aba": 14,
        "nur": 6,
        "chg": 18,
        "end": 15,
        "het": 71,
        "agg": 64,
        "con": 45
      },
      "12": {
        "ach": 40,
        "def": 27,
        "ord": 24,
        "exh": 61,
        "aut": 54,
        "aff": 10,
        "int": 25,
        "suc": 46,
        "dom": 71,
        "aba": 18,
        "nur": 9,
        "chg": 23,
        "end": 20,
        "het": 75,
        "agg": 71,
        "con": 66
      },
      "13": {
        "ach": 50,
        "def": 37,
        "ord": 30,
        "exh": 70,
        "aut": 64,
        "aff": 15,
        "int": 32,
        "suc": 55,
        "dom": 76,
        "aba": 23,
        "nur": 13,
        "chg": 30,
        "end": 25,
        "het": 78,
        "agg": 78,
        "con": 85
      },
      "14": {
        "ach": 60,
        "def": 46,
        "ord": 38,
        "exh": 78,
        "aut": 72,
        "aff": 20,
        "int": 42,
        "suc": 64,
        "dom": 80,
        "aba": 29,
        "nur": 18,
        "chg": 37,
        "end": 32,
        "het": 81,
        "agg": 83,
        "con": 97
      },
      "15": {
        "ach": 70,
        "def": 56,
        "ord": 46,
        "exh": 84,
        "aut": 79,
        "aff": 27,
        "int": 52,
        "suc": 72,
        "dom": 85,
        "aba": 36,
        "nur": 24,
        "chg": 45,
        "end": 39,
        "het": 84,
        "agg": 87,
        "con": 99
      },
      "16": {
        "ach": 77,
        "def": 66,
        "ord": 56,
        "exh": 89,
        "aut": 85,
        "aff": 35,
        "int": 62,
        "suc": 78,
        "dom": 89,
        "aba": 43,
        "nur": 31,
        "chg": 53,
        "end": 47,
        "het": 87,
        "agg": 91,
        "con": 99
      },
      "17": {
        "ach": 83,
        "def": 75,
        "ord": 65,
        "exh": 93,
        "aut": 89,
        "aff": 44,
        "int": 70,
        "suc": 84,
        "dom": 91,
        "aba": 51,
        "nur": 38,
        "chg": 60,
        "end": 56,
        "het": 89,
        "agg": 93,
        "con": 99
      },
      "18": {
        "ach": 88,
        "def": 83,
        "ord": 73,
        "exh": 95,
        "aut": 93,
        "aff": 54,
        "int": 77,
        "suc": 88,
        "dom": 94,
        "aba": 59,
        "nur": 47,
        "chg": 68,
        "end": 64,
        "het": 91,
        "agg": 96,
        "con": 99
      },
      "19": {
        "ach": 92,
        "def": 89,
        "ord": 80,
        "exh": 97,
        "aut": 96,
        "aff": 63,
        "int": 84,
        "suc": 92,
        "dom": 95,
        "aba": 68,
        "nur": 56,
        "chg": 76,
        "end": 72,
        "het": 93,
        "agg": 97,
        "con": 99
      },
      "20": {
        "ach": 95,
        "def": 94,
        "ord": 85,
        "exh": 98,
        "aut": 97,
        "aff": 73,
        "int": 89,
        "suc": 94,
        "dom": 97,
        "aba": 75,
        "nur": 64,
        "chg": 81,
        "end": 79,
        "het": 94,
        "agg": 98,
        "con": 99
      },
      "21": {
        "ach": 96,
        "def": 97,
        "ord": 90,
        "exh": 99,
        "aut": 98,
        "aff": 81,
        "int": 93,
        "suc": 96,
        "dom": 98,
        "aba": 82,
        "nur": 72,
        "chg": 87,
        "end": 85,
        "het": 95,
        "agg": 99,
        "con": 99
      },
      "22": {
        "ach": 98,
        "def": 98,
        "ord": 94,
        "exh": 99,
        "aut": 99,
        "aff": 88,
        "int": 95,
        "suc": 98,
        "dom": 98,
        "aba": 87,
        "nur": 79,
        "chg": 91,
        "end": 9,
        "het": 96,
        "agg": 99,
        "con": 99
      },
      "23": {
        "ach": 99,
        "def": 99,
        "ord": 96,
        "exh": 99,
        "aut": 99,
        "aff": 92,
        "int": 97,
        "suc": 98,
        "dom": 99,
        "aba": 92,
        "nur": 87,
        "chg": 94,
        "end": 94,
        "het": 97,
        "agg": 99,
        "con": 99
      },
      "24": {
        "ach": 99,
        "def": 99,
        "ord": 98,
        "exh": 99,
        "aut": 99,
        "aff": 96,
        "int": 98,
        "suc": 99,
        "dom": 99,
        "aba": 95,
        "nur": 91,
        "chg": 97,
        "end": 96,
        "het": 98,
        "agg": 99,
        "con": 99
      },
      "25": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 98,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 97,
        "nur": 96,
        "chg": 98,
        "end": 98,
        "het": 98,
        "agg": 99,
        "con": 99
      },
      "26": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 98,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      },
      "27": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      },
      "28": {
        "ach": 99,
        "def": 99,
        "ord": 99,
        "exh": 99,
        "aut": 99,
        "aff": 99,
        "int": 99,
        "suc": 99,
        "dom": 99,
        "aba": 99,
        "nur": 99,
        "chg": 99,
        "end": 99,
        "het": 99,
        "agg": 99,
        "con": 99
      }
    }
  }
},
  narratives: {
  "ach": {
    "sangat_tinggi": "Sangat ingin jadi lebih baik, sangat tertarik dengan tugas menantang, kompleks dan rumit",
    "tinggi": "Dorongan untuk bertindak lebih baik, tertarik dengan tugas menantang dan rumit.",
    "sedang": "Dorongan untuk menyelesaikan sesuatu dengan baik, ingin sukses dalam segala hal dan ingin diakui kemampuannya",
    "rendah": "Dorongan untuk meraih prestasi rendah, cepat menyerah dengan situasi rumit atau menghindar apabila dihadapkan dengan situasi yang kompleks.",
    "sangat_rendah": "Tidak ada keinginan untuk lebih baik, pasti gagal bila ketemu sedikit saja kesulitan"
  },
  "def": {
    "sangat_tinggi": "Sangat mudah terpengaruh oleh orang lain, sangat tertarik akan kesuksesan orang lain, sangat banyak tergantung pada orang lain.",
    "tinggi": "Kecenderungan pribadi mudah terpengaruh oleh orang lain, ketertarikan akan kesuksesan orang lain, banyak tergantung pada orang lain.",
    "sedang": "Cenderung  mudah dipengaruhi, dalam keseharian tidak dapat berpikir kritis dan condong menjadi orang yang dipimpin, kurang patuh aturan yang sering diakibatkan kurangnya pemahaman terhadap konsekuensi ketidak patuhan",
    "rendah": "Tidak tertarik pada kesuksesan orang lain, fokus pada diri sendiri, sulit patuh pada orang lain, dan cenderung melakukan dengan caranya sendiri.",
    "sangat_rendah": "Pribadi yang hanya berpusat pada dirinya sendiri, kesuksesan orang lain tidak memberikan dorongan apapun pada dirinya, Bertindak sesuai keinginan. Tidak bisa diperintah"
  },
  "ord": {
    "sangat_tinggi": "Ingin mengatur segalanya. Selalu mengejar keteraturan yang tinggi, sangat terorganisir, rapi termasuk dalam perencanaan dan aktivitasnya.",
    "tinggi": "Kecenderungan memiliki keteraturan yang tinggi, terorganisir, rapi termasuk dalam perencanaan dan aktivitasnya.",
    "sedang": "Kurang mampu dalam mengatur pekerjaan secara rinci dan sistematis, memiliki rencana untuk teratur namun sering gagal melaksanakannya",
    "rendah": "Cara kerja atau bertindak cenderung tidak teratur, lebih dikuasai oleh situasi perasaan, kurang terencana dalam bertindak, dan sikapnya mudah berubah-ubah.",
    "sangat_rendah": "Tidak ada keteraturan dalam bekerja maupun mengurus diri sendiri. Bekerja tergantung perasaan dan gampang berubah ubah sifat maupun omongan"
  },
  "exh": {
    "sangat_tinggi": "Sangat suka untuk pamer, menampilkan apa yang dimiliki ke lingkungan sosial sekitar.",
    "tinggi": "Kecenderungan untuk pamer, menampilkan apa yang dimiliki ke lingkungan sosial sekitar.",
    "sedang": "Suka membicarakan pengalaman dan pencapaiannya dalam konteks yang wajar dan tidak berlebihan, memiliki hasrat untuk di kagumi",
    "rendah": "Tidak tertarik dengan situasi sosial, cenderung cuek dengan keadaan lingkungan sekitar, cuek terhadap apa yang dialami oleh orang lain.",
    "sangat_rendah": "pribadi yang merasa hidup sendiri, acuh akan situasi sosial dan cuek dengan orang lain. Dirinya adalah satu satunya hal yg dipikirkan"
  },
  "aut": {
    "sangat_tinggi": "Hanya bertindak sesuai keinginan, tidak bisa mengikuti perintah",
    "tinggi": "Pribadi mudah untuk bertindak sesuai keinginan, tidak tergantung pada orang lain.",
    "sedang": "Memiliki kebutuhan akan kebebasan, menghindari sesuatu yang bisa jadi tanggung jawabnya kurang mampu mengendalikan diri secara kooperatif dan selalu menginginkan perubahan akan suatu hal terkait dirinya",
    "rendah": "Ketergantungan yang tinggi pada orang lain, dalam mengambil tindakan harus meminta persetujuan orang lain terlebih dahulu, menghindari tindakan yang menarik perhatian sosial.",
    "sangat_rendah": "Tidak bisa hidup tanpa orang lain yang membuat keputusan untuknya, selalu takut membuat keputusan salah. Tidak mau menarik perhatian"
  },
  "aff": {
    "sangat_tinggi": "Loyalitas sangat tinggi terhadap situasi sosial, sangat mudah berpartisipasi dan beraktivitas.",
    "tinggi": "Loyalitas terhadap situasi sosial, mudah berpartisipasi dan beraktivitas.",
    "sedang": "kebutuhan akan kesetiaan terhadap temannya, berpartisipasi aktif dalam kelompok, kebutuhan untuk kemanusiaan, kebutuhan menjalin hubungan yang harmonis dan menyenangkan",
    "rendah": "Pribadi tertutup, introversi tinggi, sulit bergaul.",
    "sangat_rendah": "Pribadi introvert yang sangat tertutup tidak ada pergaulan. Hidup didunianya sendiri"
  },
  "int": {
    "sangat_tinggi": "Kebutuhan sangat tinggi untuk bisa menganalisis motif dan perasaan manusia, tingkat empati yang tinggi dan keseringan membayangkan berada di posisi orang lain",
    "tinggi": "kebutuhan untuk selalu introspeksi, menilai dan mengevaluasi diri dan perasaan orang, memiliki rasa empati tinggi",
    "sedang": "Berusaha memahami perasaan orang lain dan gampang merasa kasihan bila ada yang kesulitan. Aktif dalam mengembangkan dirinya dan maupun terhadap masalah orang lain",
    "rendah": "Terlalu mengabaikan perasaan dan sikap didominasi atas dasar logika.",
    "sangat_rendah": "Segala sesuatu dilakukan atas dasar angka dan logika. Kaku dan tanpa perasaan"
  },
  "suc": {
    "sangat_tinggi": "Sangat tergantung pada orang lain. Tidak bisa mandiri, tidak bisa ambil keputusan sendiri Selalu Berharap orang bisa empati dan bisa selalu membantu dirinya",
    "tinggi": "ketergantungan tinggi pada orang lain. Keinginan tinggi untuk selalu meperoleh Empati, bantuan dari orang lain untuk memudahkan permasalahannya",
    "sedang": "Kebutuhan akan dukungan dari orang-orang sekitarnya, ingin diberi bantuan ketika kesusahan atau musibah, ingin orang lain dapat memahami dirinya beserta masalah yang hadapi",
    "rendah": "Pribadi yang independent, senang dengan aktivitas diri dan mengarah ke mengacuhkan situasi sosial.",
    "sangat_rendah": "Pribadi mandiri yang melakukan segala sesuatunya sendiri, anti sosial dan tidak suka dikerumunan"
  },
  "dom": {
    "sangat_tinggi": "Merasa kurang aman jika tidak memiliki dominasi . Kebutuhan Dominasi terhadap situasi sosial tinggi, kebutuhan tinggi untuk memimpin dalam kelompok.",
    "tinggi": "Kebutuhan Dominasi terhadap situasi sosial tinggi, pribadi yang aktif dan bisa memimpin kelompok. Cenderung ingin membuktikan kepemimpinannya",
    "sedang": "Memiliki keinginan agar dipatuhi dan dipercaya oleh orang sekitar, keinginan untuk membawa diri sendiri dan orang disekitar untuk menjadi lebih baik",
    "rendah": "Tidak memiliki keberanian untuk memimpin, patuh terhadap pimpinan, mudah dikendalikan dan sulit menolak dalam kelompok.",
    "sangat_rendah": "orang yang gampang dikendalikan, gampang percaya omongan orang dan tidak bisa menolak apapun keinginan kelompok"
  },
  "aba": {
    "sangat_tinggi": "Pribadi yang selalu merasa bersalah, selalu menyesali diri dan merasa dirinya inferioritas.",
    "tinggi": "Pribadi yang mudah merasa bersalah, menyesali diri dan mengarah pada inferioritas.",
    "sedang": "Keinginan untuk mengalah atau menghindari konflik dalam suatu masalah. Memiliki keinginan untuk rendah diri serta kemampuan intropeksi diri atas kekurangannya",
    "rendah": "Pribadi yang berpikir positif, terbuka, mudah memaafkan dan meminta maaf bila terjadi kesalahan.",
    "sangat_rendah": "Orang yangdengan pemikiran  sangat terbuka,terlalu gampang memaafkan atau minta maaf, menghindari konflik"
  },
  "nur": {
    "sangat_tinggi": "Pribadi yang sangat terbuka, selalu membantu orang lain, sangat santun dan mudah berpartisipasi.",
    "tinggi": "Pribadi yang terbuka, mudah membantu orang lain, santun dan mudah berpartisipasi.",
    "sedang": "Dapat mengontrol emosi dan perasaannya secara baik dalam hubungan sosial, dapat mengatur keinginannya untuk menolong orang dengan normal secara tepat",
    "rendah": "Pribadi yang tertutup, individu yamg kaku, sulit bersimpati dan mudah berkata kasar.",
    "sangat_rendah": "Orang yang sangat kaku, tertutup, anti sosial, gampang emosi dan berkata kasar. Pendendam"
  },
  "chg": {
    "sangat_tinggi": "Sangat tertarik dengan hal baru, dalam bekerja selalu dengan cara yang baru.",
    "tinggi": "Sangat tertarik dengan situasi baru, termasuk dalam bekerja berupaya dengan cara yang baru.",
    "sedang": "Kebutuhan akan perubahan atau hal yang baru, bosan dengan hal yang monoton, ingin adanya variasi dalam penyegaran dan pengembangan diri",
    "rendah": "Merasakan kenyamanan dengan situasi yang rutin, suka dengan aktivitas yang monoton dan terkesan membosankan.",
    "sangat_rendah": "Orang yang sulit keluar dari zona nyaman, sulit menerima perubahan dan hal baru. Orang yang selalu mencari aman tanpa resiko"
  },
  "end": {
    "sangat_tinggi": "Tanggung jawabyang sangat tinggi terhadap pekerjaan, rela berkorban untuk menyelesaikan apa yang telah dimulai dan tekun.",
    "tinggi": "Tanggung jawab tinggi terhadap pekerjaan, menyelesaikan apa yang telah dimulai dan tekun. Menyiapkan solusi akan semua kemungkinan dimasa depan",
    "sedang": "Memiliki keuletan, kegigihan dan ketekunan dalam menyelesaikan pekerjaan. Mampu mengantisipasi akan kemungkinan yang bisa terjadi kedepannya",
    "rendah": "Daya tahan rendah terhadap situasi yang menekan, mudah menyerah dan cepat jenuh.",
    "sangat_rendah": "Tipe yang gampang stres, menyerah ketika menghadapi masalah, gampang bosan"
  },
  "het": {
    "sangat_tinggi": "Ketertarikan sangat tinggi untuk bergaul dengan lawan jenis, selalu mengejar perhatian dari lawan jenis.",
    "tinggi": "Ketertarikan tinggi untuk bergaul dengan lawan jenis, berupaya untuk mendapatkan perhatian dari lawan jenis.",
    "sedang": "memiliki kehidupan seksual yang ditekan atau repressed dalam artian terdapat libido namun ditekan sehingga tidak muncul. mengikutsertakan lawan jenis dalam aktifitas sosialnya",
    "rendah": "Tidak mudah tertarik dengan lawan jenis, cenderung lebih nyaman beraktifitas dengan sesama jenis.",
    "sangat_rendah": "Tidak memiliki ketertarikan dengan lawan jenis, menghindari aktivitas dengan lawan jenis"
  },
  "agg": {
    "sangat_tinggi": "Sifat sangat agresif dan suka berdebat dan menyerang orang lain di setiap kesempatan hingga lawan dipermalukan. Bila kalah pasti akan dicari kesempatan membalas",
    "tinggi": "Dorongan agresi tinggi, senang dengan konfrontasi. (menyerang pendapat orang lain yang berbeda, suka mempermalukan orang lain.)",
    "sedang": "Mampu mengontrol keinginan untuk agresif secara normal, tidak cenderung menjatuhkan orang lain. Berani melakukan sesuatu meski dengan resiko tinggi",
    "rendah": "Pribadi tenang, menghindari konflik dan konfrontasi.",
    "sangat_rendah": "Orang yang selalu menghindari konflik, selalu mengalah, tidak berani beradu argumen, selalu memendam pemikirannya sendiri"
  }
},

  factors_en: {
  "ach": {
    "name": "Achievement",
    "code": "ach",
    "desc": "Need for personal achievement, success, and mastering challenging tasks",
    "icon": "trophy"
  },
  "def": {
    "name": "Deference",
    "code": "def",
    "desc": "Need to follow instructions, respect authority, and adhere to conventions",
    "icon": "check-square"
  },
  "ord": {
    "name": "Order",
    "code": "ord",
    "desc": "Need for neatness, organization, planning, and structured workflow",
    "icon": "list-ordered"
  },
  "exh": {
    "name": "Exhibition",
    "code": "exh",
    "desc": "Need to be the center of attention, talk about successes, and gain recognition",
    "icon": "sparkles"
  },
  "aut": {
    "name": "Autonomy",
    "code": "aut",
    "desc": "Need for independence, personal freedom, and self-directed decision making",
    "icon": "compass"
  },
  "aff": {
    "name": "Affiliation",
    "code": "aff",
    "desc": "Need to form warm friendships, share experiences, and belong to groups",
    "icon": "users"
  },
  "int": {
    "name": "Intraception",
    "code": "int",
    "desc": "Need to understand human motives, analyze feelings, and empathize with others",
    "icon": "brain"
  },
  "suc": {
    "name": "Succorance",
    "code": "suc",
    "desc": "Need to receive encouragement, sympathy, and emotional support from others",
    "icon": "heart-handshake"
  },
  "dom": {
    "name": "Dominance",
    "code": "dom",
    "desc": "Need to lead, influence, supervise, and direct other people",
    "icon": "shield-star"
  },
  "aba": {
    "name": "Abasement",
    "code": "aba",
    "desc": "Need for self-reflection, admitting errors, humility, and avoiding conflicts",
    "icon": "user-check"
  },
  "nur": {
    "name": "Nurturance",
    "code": "nur",
    "desc": "Need to help, show kindness, and support those who are facing difficulties",
    "icon": "gift"
  },
  "chg": {
    "name": "Change",
    "code": "chg",
    "desc": "Need for novelty, new experiences, variety, and moving away from routine",
    "icon": "refresh-cw"
  },
  "end": {
    "name": "Endurance",
    "code": "end",
    "desc": "Need for perseverance, persistence, and seeing projects through to the end",
    "icon": "zap"
  },
  "het": {
    "name": "Heterosexual",
    "code": "het",
    "desc": "Need for social interaction, charm, and interpersonal engagement across genders",
    "icon": "heart"
  },
  "agg": {
    "name": "Aggression",
    "code": "agg",
    "desc": "Need to voice critical opinions, debate vigorously, and confront disagreements",
    "icon": "flame"
  }
},
  narratives_en: {
  "ach": {
    "sangat_tinggi": "Extremely strong drive to excel; highly attracted to difficult, complex, and ambitious tasks; sets very high personal benchmarks.",
    "tinggi": "Strong drive to act better; eager to tackle challenging, intricate tasks and achieve recognized excellence.",
    "sedang": "Drive to complete work properly; seeks success and recognition of capabilities in a realistic, balanced manner.",
    "rendah": "Low drive for competitive achievement; easily discouraged by complications; prefers routine and simple assignments.",
    "sangat_rendah": "Very low ambition to strive for improvement; easily defeated by minor obstacles; avoids accountability for results."
  },
  "def": {
    "sangat_tinggi": "Highly dependent on authority; strongly attracted to successful figures; easily influenced and strictly obedient.",
    "tinggi": "Inclined to follow guidelines and respect established procedures; receptive to leadership and mentorship.",
    "sedang": "Moderately adaptable to rules; cooperative with leadership while retaining a reasonable degree of independent judgment.",
    "rendah": "Low deference to convention; prefers doing things their own way; less interested in emulating others or strict hierarchy.",
    "sangat_rendah": "Exclusively self-directed; indifferent to authority or external success models; strongly resists being told what to do."
  },
  "ord": {
    "sangat_tinggi": "Extreme need for organization and perfectionism; demands meticulous planning, clean systematic workflow, and strict routines.",
    "tinggi": "High inclination toward order, neatness, and structured planning in both workplace and personal activities.",
    "sedang": "Moderate organizational discipline; values orderliness but may occasionally be flexible or casual in execution.",
    "rendah": "Informal, spontaneous approach to work; less structured; easily influenced by mood and situations rather than detailed plans.",
    "sangat_rendah": "Lacks organizational structure in work and routine; unpredictable, highly disorganized, and prone to frequent changes of mind."
  },
  "exh": {
    "sangat_tinggi": "Intense desire to be the center of attention; enjoys showcasing achievements and seeking broad social admiration.",
    "tinggi": "Enjoys visibility and talking about personal milestones; comfortable in social spotlights.",
    "sedang": "Comfortable sharing achievements in moderation; enjoys social acknowledgment without excessive boasting.",
    "rendah": "Prefers low social visibility; indifferent to public praise; reserved in group settings.",
    "sangat_rendah": "Avoids any social spotlight; strictly private; indifferent to audience approval."
  },
  "aut": {
    "sangat_tinggi": "Extreme demand for absolute freedom; acts strictly on personal impulses; resists any supervision or institutional constraints.",
    "tinggi": "High independence and self-reliance; comfortable making independent decisions without needing external approval.",
    "sedang": "Balanced desire for independence; values autonomy while remaining cooperative and responsible within team frameworks.",
    "rendah": "High dependency on external consensus; hesitates to make decisions without prior approval from superiors or peers.",
    "sangat_rendah": "Unable to make decisions independently; fearful of making mistakes; completely relies on others for direction."
  },
  "aff": {
    "sangat_tinggi": "Very high social loyalty; thrives in group camaraderie; dedicates significant energy to maintaining close friendships.",
    "tinggi": "Warm, sociable, and loyal; actively engages in group activities and values harmonious relationships.",
    "sedang": "Balanced social orientation; maintains loyal friendships and participates cooperatively when required.",
    "rendah": "Reserved and introverted; finds socializing draining; prefers solitary work or very small circle.",
    "sangat_rendah": "Highly introverted and socially detached; lives in their own private bubble; avoids social interaction."
  },
  "int": {
    "sangat_tinggi": "Profound psychological insight; constantly analyzes motives and deep human emotions; puts themselves in others' shoes.",
    "tinggi": "High empathy and psychological curiosity; evaluates behavior based on motives rather than superficial actions.",
    "sedang": "Adequate empathy; strives to understand others' feelings and provides compassionate support in interpersonal settings.",
    "rendah": "Pragmatic and logic-driven; overlooks subtle psychological undercurrents in favor of concrete facts.",
    "sangat_rendah": "Strictly mechanical and logic-bound; completely indifferent to emotions; rigid and detached."
  },
  "suc": {
    "sangat_tinggi": "Strong psychological dependency; constantly seeks emotional validation, sympathy, and support when facing difficulty.",
    "tinggi": "High desire for support and encouragement; appreciates being cared for and comforted during challenging times.",
    "sedang": "Moderate need for social support; appreciates constructive encouragement when encountering difficulties.",
    "rendah": "Emotionally self-sufficient; prefers solving personal problems privately without seeking sympathy.",
    "sangat_rendah": "Extremely independent and self-contained; shuns any display of vulnerability or sympathy."
  },
  "dom": {
    "sangat_tinggi": "Strong appetite for power and command; insists on steering group decisions and influencing outcomes.",
    "tinggi": "Natural leadership drive; active, assertive, and eager to organize and guide team members.",
    "sedang": "Constructive leadership potential; desires to be respected and trusted, guiding others toward mutual goals.",
    "rendah": "Hesitant to take charge; prefers supporting rather than leading; complies easily with group consensus.",
    "sangat_rendah": "Easily dominated and manipulated; lacks assertiveness; avoids taking responsibility for group direction."
  },
  "aba": {
    "sangat_tinggi": "Pronounced feelings of guilt and inferiority; excessively self-blaming and apologetic even when not at fault.",
    "tinggi": "Readily admits mistakes; prone to self-criticism and quick to yield to avoid confrontational friction.",
    "sedang": "Healthy humility and capacity for self-reflection; willing to concede and compromise when appropriate.",
    "rendah": "Self-confident and optimistic; easily moves past errors without lingering guilt or excessive remorse.",
    "sangat_rendah": "Uncompromising self-assurance; rarely acknowledges errors or apologizes; deflects blame outwards."
  },
  "nur": {
    "sangat_tinggi": "Deep altruism; constantly attends to others' welfare; exceptionally generous and compassionate.",
    "tinggi": "Helpful, polite, and considerate; naturally inclined to assist friends and colleagues in need.",
    "sedang": "Well-regulated emotional warmth; provides timely assistance while maintaining appropriate social boundaries.",
    "rendah": "Emotionally guarded; formal and somewhat stiff in personal assistance; slow to show warmth.",
    "sangat_rendah": "Cold, aloof, and unsympathetic; displays irritability when asked for help; indifferent to others."
  },
  "chg": {
    "sangat_tinggi": "Incessant thirst for novelty; craves constant variety, experimentation, and changing routines.",
    "tinggi": "Welcomes new experiences, adaptable to dynamic environments, and enjoys learning fresh methods.",
    "sedang": "Balanced openness to innovation; values refreshing variety while appreciating steady workflow.",
    "rendah": "Strong preference for established routines; feels most productive in predictable, stable settings.",
    "sangat_rendah": "Extremely risk-averse and resistant to change; clings to familiar comfort zones at all costs."
  },
  "end": {
    "sangat_tinggi": "Extraordinary tenacity; relentlessly works on projects until finished; undeterred by fatigue or hurdles.",
    "tinggi": "High conscientiousness and grit; takes pride in finishing what was started; methodically solves problems.",
    "sedang": "Good work persistence; perseveres through standard challenges and sees duties through to completion.",
    "rendah": "Low frustration tolerance; easily discouraged by prolonged complications; prone to boredom.",
    "sangat_rendah": "Quits at the earliest sign of resistance; highly susceptible to stress and easily overwhelmed."
  },
  "het": {
    "sangat_tinggi": "Very strong interest in opposite-sex social engagement and romantic magnetism; highly expressive socially.",
    "tinggi": "High social charm and interest in mixed-gender camaraderie; seeks social engagement.",
    "sedang": "Balanced and conventional social relations across genders; healthy interpersonal dynamics.",
    "rendah": "Reserved interpersonal focus; prefers professional boundaries with less interest in mixed-gender socialization.",
    "sangat_rendah": "Avoids mixed-gender social interactions; strictly detached."
  },
  "agg": {
    "sangat_tinggi": "Highly confrontational and argumentative; actively attacks differing opinions; uninhibited in verbal sparring.",
    "tinggi": "High assertiveness; enjoys lively debates and willing to confront opposing viewpoints directly.",
    "sedang": "Controlled assertiveness; stands firm on principles without needlessly attacking or antagonizing others.",
    "rendah": "Peace-seeking and non-confrontational; avoids arguments and prefers amicable diplomacy.",
    "sangat_rendah": "Conflict-avoidant to an extreme; holds back dissenting thoughts; never challenges others."
  }
},
  shortSummaries: {
  "ach": {
    "sangat_tinggi": {
      "id": "Ambisi sangat tinggi, mengejar target puncak & kompleks",
      "en": "Extremely high ambition; pursues complex & peak targets"
    },
    "tinggi": {
      "id": "Dorongan berprestasi kuat & menyukai tantangan",
      "en": "Strong achievement drive & seeks challenging assignments"
    },
    "sedang": {
      "id": "Dorongan berprestasi proporsional & realistis",
      "en": "Balanced & realistic achievement drive"
    },
    "rendah": {
      "id": "Cepat menyerah pada tugas rumit, motivasi rendah",
      "en": "Easily gives up on complex tasks; low ambition"
    },
    "sangat_rendah": {
      "id": "Menolak tantangan & rentan gagal pada kesulitan",
      "en": "Avoids challenges & very vulnerable to failure"
    }
  },
  "def": {
    "sangat_tinggi": {
      "id": "Sangat bergantung pada arahan & figur pimpinan",
      "en": "Highly dependent on directives & leadership figures"
    },
    "tinggi": {
      "id": "Patuh pada aturan & menghormati otoritas atasan",
      "en": "Compliant with guidelines & respects authority"
    },
    "sedang": {
      "id": "Cukup kooperatif terhadap arahan & tata tertib",
      "en": "Fairly cooperative with rules & instructions"
    },
    "rendah": {
      "id": "Kurang patuh, lebih suka cara kerja sendiri",
      "en": "Independent-minded; prefers doing things their own way"
    },
    "sangat_rendah": {
      "id": "Menolak diatur & bertindak semaunya sendiri",
      "en": "Resists authority & acts strictly on own accord"
    }
  },
  "ord": {
    "sangat_tinggi": {
      "id": "Sangat perfeksionis, detail, rapi, & terencana",
      "en": "Perfectionist; exceptionally organized & planned"
    },
    "tinggi": {
      "id": "Terorganisir, sistematis, & menyukai keteraturan",
      "en": "Well-organized, systematic, & structured"
    },
    "sedang": {
      "id": "Keteraturan kerja cukup baik & wajar",
      "en": "Adequate & sensible workplace orderliness"
    },
    "rendah": {
      "id": "Kurang terencana, cara kerja cenderung spontan/acak",
      "en": "Spontaneous, loosely planned, & informal work style"
    },
    "sangat_rendah": {
      "id": "Sangat berantakan, tidak teratur, & tidak konsisten",
      "en": "Highly disorganized, chaotic, & erratic"
    }
  },
  "exh": {
    "sangat_tinggi": {
      "id": "Sangat butuh perhatian & panggung sosial",
      "en": "Intense craving for social spotlight & admiration"
    },
    "tinggi": {
      "id": "Percaya diri tampil & senang menceritakan pencapaian",
      "en": "Confident in spotlight; shares accomplishments readily"
    },
    "sedang": {
      "id": "Komunikasi sosial wajar & proporsional",
      "en": "Normal, balanced social expressiveness"
    },
    "rendah": {
      "id": "Pendiam, menghindari sorotan publik",
      "en": "Reserved; avoids being in the limelight"
    },
    "sangat_rendah": {
      "id": "Sangat tertutup & acuh terhadap situasi sosial",
      "en": "Extremely detached; shuns all social attention"
    }
  },
  "aut": {
    "sangat_tinggi": {
      "id": "Tuntutan kebebasan mutlak, menolak batasan",
      "en": "Demands total independence; rejects constraints"
    },
    "tinggi": {
      "id": "Mandiri, tidak bergantung pada keputusan orang lain",
      "en": "Self-reliant; comfortable deciding independently"
    },
    "sedang": {
      "id": "Kemandirian seimbang dengan kepatuhan tim",
      "en": "Balanced autonomy; cooperative within team frameworks"
    },
    "rendah": {
      "id": "Cenderung bergantung pada persetujuan orang lain",
      "en": "Hesitant; relies heavily on external approval"
    },
    "sangat_rendah": {
      "id": "Sangat tergantung pada orang lain, takut salah",
      "en": "Extremely dependent; fearful of making independent choices"
    }
  },
  "aff": {
    "sangat_tinggi": {
      "id": "Loyalitas pertemanan sangat tinggi & aktif bersosial",
      "en": "Very high camaraderie & active social networking"
    },
    "tinggi": {
      "id": "Hangat, bersahabat, & mudah berkolaborasi",
      "en": "Warm, friendly, & collaborates with ease"
    },
    "sedang": {
      "id": "Hubungan sosial berjalan harmonis & wajar",
      "en": "Healthy, harmonious interpersonal relations"
    },
    "rendah": {
      "id": "Introvert, pergaulan terbatas pada lingkaran kecil",
      "en": "Introverted; keeps a small and quiet social circle"
    },
    "sangat_rendah": {
      "id": "Sangat menutup diri, menyendiri, & anti-sosial",
      "en": "Deeply isolated; avoids social integration entirely"
    }
  },
  "int": {
    "sangat_tinggi": {
      "id": "Empati sangat mendalam, analitis terhadap psikologis",
      "en": "Profound psychological insight & high empathy"
    },
    "tinggi": {
      "id": "Peka memahami perasaan & motif orang lain",
      "en": "Perceptive of others' feelings & underlying motives"
    },
    "sedang": {
      "id": "Empati & pemahaman interpersonal cukup baik",
      "en": "Good interpersonal empathy & common sense"
    },
    "rendah": {
      "id": "Lebih mengutamakan logika daripada perasaan",
      "en": "Prioritizes logic over emotional nuance"
    },
    "sangat_rendah": {
      "id": "Kaku, dingin, & mengabaikan aspek perasaan",
      "en": "Detached, rigid, & dismissive of emotional factors"
    }
  },
  "suc": {
    "sangat_tinggi": {
      "id": "Sangat butuh simpati & bantuan saat ada masalah",
      "en": "High emotional dependency; constantly seeks sympathy"
    },
    "tinggi": {
      "id": "Mengharapkan dorongan & perhatian rekan kerja",
      "en": "Appreciates encouragement & support during stress"
    },
    "sedang": {
      "id": "Menerima bantuan secara wajar saat kesulitan",
      "en": "Welcomes appropriate assistance when in need"
    },
    "rendah": {
      "id": "Mandiri menyelesaikan kesulitan pribadi",
      "en": "Self-sufficient; prefers handling hardship alone"
    },
    "sangat_rendah": {
      "id": "Sangat menolak bantuan & menutup diri dari simpati",
      "en": "Completely avoids showing vulnerability or seeking help"
    }
  },
  "dom": {
    "sangat_tinggi": {
      "id": "Hasrat memimpin sangat dominan, ingin mengontrol",
      "en": "Strong desire to dominate, command, & steer teams"
    },
    "tinggi": {
      "id": "Jiwa kepemimpinan aktif, tegas, & persuasif",
      "en": "Active, assertive leadership & persuasive influence"
    },
    "sedang": {
      "id": "Mampu memimpin atau dipimpin secara kooperatif",
      "en": "Adaptable leader or follower depending on context"
    },
    "rendah": {
      "id": "Lebih suka menjadi pengikut daripada pemimpin",
      "en": "Prefers supporting role; hesitant to take command"
    },
    "sangat_rendah": {
      "id": "Sangat mudah dikendalikan, pasif, & tidak asertif",
      "en": "Passive, easily swayed, & avoids assertiveness"
    }
  },
  "aba": {
    "sangat_tinggi": {
      "id": "Mudah merasa bersalah & rendah diri berlebihan",
      "en": "Excessive guilt, self-blame, & feelings of inferiority"
    },
    "tinggi": {
      "id": "Mudah mengalah, introspektif, & mengakui kesalahan",
      "en": "Readily concedes, introspective, & admits faults"
    },
    "sedang": {
      "id": "Rendah hati & mampu berintrospeksi dengan sehat",
      "en": "Healthy humility & realistic self-reflection"
    },
    "rendah": {
      "id": "Percaya diri tinggi, jarang merasa bersalah",
      "en": "Self-assured; moves forward without lingering remorse"
    },
    "sangat_rendah": {
      "id": "Keras kepala, menolak mengakui kesalahan sendiri",
      "en": "Uncompromising; refuses to admit mistakes or apologize"
    }
  },
  "nur": {
    "sangat_tinggi": {
      "id": "Sangat peduli, berjiwa penolong, & murah hati",
      "en": "Deeply altruistic, generous, & protective of others"
    },
    "tinggi": {
      "id": "Sopan, ramah, & sigap membantu rekan kerja",
      "en": "Courteous, helpful, & readily assists teammates"
    },
    "sedang": {
      "id": "Perilaku menolong seimbang & proporsional",
      "en": "Balanced, healthy willingness to support others"
    },
    "rendah": {
      "id": "Cenderung kaku & kurang peka menolong sesama",
      "en": "Formal, guarded, & slow to offer voluntary help"
    },
    "sangat_rendah": {
      "id": "Dingin, tidak peduli pada kesulitan orang lain",
      "en": "Cold, unsympathetic, & indifferent to others' plights"
    }
  },
  "chg": {
    "sangat_tinggi": {
      "id": "Sangat cepat bosan, selalu mencari inovasi baru",
      "en": "Quickly bored; constantly seeks novel methods"
    },
    "tinggi": {
      "id": "Menyukai variasi, adaptif, & fleksibel pada hal baru",
      "en": "Flexible, adaptable, & embraces fresh experiences"
    },
    "sedang": {
      "id": "Cukup terbuka pada perubahan sesuai kebutuhan",
      "en": "Reasonably open to change while valuing stability"
    },
    "rendah": {
      "id": "Menyukai rutinitas yang pasti & nyaman di zona aman",
      "en": "Comfortable with fixed routines & predictability"
    },
    "sangat_rendah": {
      "id": "Sangat kaku menolak perubahan metode lama",
      "en": "Highly resistant to change; clings to familiar habits"
    }
  },
  "end": {
    "sangat_tinggi": {
      "id": "Ketekunan luar biasa, tahan banting sampai tuntas",
      "en": "Exceptional perseverance; relentless until completion"
    },
    "tinggi": {
      "id": "Bertanggung jawab tinggi & tekun menyelesaikan tugas",
      "en": "Conscientious, persistent, & finishes what is started"
    },
    "sedang": {
      "id": "Daya tahan kerja memadai pada beban normal",
      "en": "Adequate stamina & steady follow-through"
    },
    "rendah": {
      "id": "Mudah jenuh & kurang gigih saat menghadapi kendala",
      "en": "Easily fatigued by hurdles; low persistence"
    },
    "sangat_rendah": {
      "id": "Cepat menyerah saat tertekan, daya tahan rendah",
      "en": "Gives up quickly under pressure; very low grit"
    }
  },
  "het": {
    "sangat_tinggi": {
      "id": "Sangat ekspresif bergaul dengan lawan jenis",
      "en": "Very outgoing in mixed-gender socialization"
    },
    "tinggi": {
      "id": "Ketertarikan tinggi pada interaksi lawan jenis",
      "en": "High sociability & ease in mixed-gender settings"
    },
    "sedang": {
      "id": "Interaksi sosial lintas gender berlangsung wajar",
      "en": "Conventional, balanced cross-gender socialization"
    },
    "rendah": {
      "id": "Cenderung formal & menjaga jarak dengan lawan jenis",
      "en": "Formal & reserved in cross-gender interactions"
    },
    "sangat_rendah": {
      "id": "Menghindar dari interaksi sosial dengan lawan jenis",
      "en": "Avoids mixed-gender socialization entirely"
    }
  },
  "agg": {
    "sangat_tinggi": {
      "id": "Sangat agresif, senang berdebat & konfrontatif",
      "en": "Highly confrontational, aggressive, & loves arguing"
    },
    "tinggi": {
      "id": "Asertif, vokal, & berani menyerang pendapat lawan",
      "en": "Assertive, vocal, & willing to challenge opposing views"
    },
    "sedang": {
      "id": "Mampu mengontrol emosi & bersikap asertif wajar",
      "en": "Controlled assertiveness without hostility"
    },
    "rendah": {
      "id": "Tenang, diplomatis, & menghindari konfrontasi",
      "en": "Diplomatic, calm, & avoids head-on conflict"
    },
    "sangat_rendah": {
      "id": "Sangat penakut berdebat, selalu memendam masalah",
      "en": "Extreme conflict avoidance; suppresses dissenting views"
    }
  }
},
  normLabelsBilingual: {
  "1": {
    "id": "Mahasiswa (Laki-laki)",
    "en": "College Student (Men)"
  },
  "2": {
    "id": "Mahasiswi (Wanita)",
    "en": "College Student (Women)"
  },
  "3": {
    "id": "Umum (Laki-laki)",
    "en": "General Adult (Men)"
  },
  "4": {
    "id": "Umum (Wanita)",
    "en": "General Adult (Women)"
  }
},
  categoryLabelsBilingual: {
  "sangat_tinggi": {
    "id": "Sangat Tinggi",
    "en": "Very High"
  },
  "tinggi": {
    "id": "Tinggi",
    "en": "High"
  },
  "sedang": {
    "id": "Sedang",
    "en": "Average"
  },
  "rendah": {
    "id": "Rendah",
    "en": "Low"
  },
  "sangat_rendah": {
    "id": "Sangat Rendah",
    "en": "Very Low"
  }
},
  consistencyBilingual: {
  "sangat_jujur": {
    "id": "Sangat Jujur",
    "en": "Highly Consistent / Honest"
  },
  "jujur": {
    "id": "Jujur",
    "en": "Consistent / Honest"
  },
  "cukup_jujur": {
    "id": "Cukup Jujur",
    "en": "Moderately Consistent"
  },
  "pembohong": {
    "id": "Inkonsisten / Pembohong",
    "en": "Inconsistent / Questionable"
  },
  "sangat_pembohong": {
    "id": "Sangat Inkonsisten",
    "en": "Highly Inconsistent"
  }
},
  normLabels: {
    1: "Mahasiswa (Laki-laki)",
    2: "Mahasiswi (Wanita)",
    3: "Umum (Laki-laki)",
    4: "Umum (Wanita)"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EPPS_DATA;
}
