document.addEventListener('DOMContentLoaded', () => {
    const wikiFrame = document.getElementById('wiki-frame');
    const btnBio = document.getElementById('btn-bio');
    const btnCv = document.getElementById('btn-cv');
    const mathSelect = document.getElementById('math-select');
    const dynamicText = document.getElementById('static-text');
    const description = document.getElementById('description');
    const korean = document.getElementById('korean');

    const setKoreanBio = () => {
        description.innerHTML = '장예원(b.2001)은 사랑, 우울, 상실 등의 현상을 바라보고 이를 공식화한다.<br> 그 수단으로 다양한 매체를 사용한다. 파티, 인터넷, 아날로그 TV, 시 등 현상과 맞물리는 매체를 작업마다 찾아 공식을 시각화한다. <br> “데이터”에 가장 관심을 두고 있다. 소외된 텍스트, 소외된 이미지, 소외된 이야기를 인터넷 공간상에 초대하여 해방한다.<br> 또한, 인터넷상에 모인 소외된 데이터가 서로 섞이기, 형태를 감추기, 익명화되기, 소리내기 등의 기법을 통해 타인에게 전달되길 바란다. 그녀는 디지털 접근성에 대해 관심도 있다.';
        description.style.fontWeight = '300';
        wikiFrame.src = "https://ko.wikipedia.org/wiki/%EC%9E%A5%EC%98%88%EC%9B%90";
    };

    const setKoreanCv = () => {
        description.innerHTML = `
        <div class="cv-content">
            <h3>학력</h3>
            <table>
                <tr>
                    <td>2024</td>
                    <td>현재 > 시적연산학교, 뉴욕<br></td>
                    <td> <a href="https://sfpc.study/sessions/summer-24/human-scale-nlp" target='_blank' > ⮂ sfpc.study </a></td>
                </tr>
                <tr>
                    <td>2020~</td>
                    <td>예술공학사, 아트&테크놀로지, 서강대학교<br>
		            공학사, 융합소프트웨어, 서강대학교
                    </td>
                    <td> <a href="https://creative.sogang.ac.kr/" target='_blank' > ⮂ creative.sogang.ac.kr </a></td>
                </tr>
            </table>
            <br><br>
            <h3>그룹 전시</h3>
            <table>
                <tr>
                    <td>2024</td>
                    <td>도전! 실버벨 프로젝트 The Silver Bell Challenge, 10의 n승, 서울</td>
                    <td> <a href="https://www.abt-avatar.world/" target='_blank'> ⮂ abt-avatar.world </a></td>
                </tr>
                <tr>
                    <td>2023</td>
                    <td>플랜티 하우스 PlanT House, 홍천미술관, 강원도 홍천
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2023</td>
                    <td>
                        ACC 역량 강화 언리얼엔진 워크샵 작품전, ACC 미디어큐브, 광주 
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2022</td>
                    <td>
                        제 8회 뉴미디어 아트 국제전, CICA미술관, 김포
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>
                        유물, 창작자의 시선, unscene_unseen, 온라인
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>
                        Beyond the Lens : Nano Bio Nature, 서울예술대학교 남산캠퍼스 심재순관, 서울
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>
                    제1회 중앙 미디어아트 공모전, 코엑스 미디어타워/파르나스 미디어타워, 서울
                    </td>
                    <td></td>
                </tr>
            </table>
            <br><br>
            <h3>레지던시 & 수상</h3>
            <table>
                <tr>
                    <td>2023</td>
                    <td>예비예술가 성장지원 플랫폼_화원(畵院):홍연길, 토탈미술관, 서울</td>
                </tr>
                <tr>
                    <td>2023</td>
                    <td>Creative Awards, HCI Korea
                    </td>
                </tr>
                <tr>
                    <td>2022</td>
                    <td>스마일게이트 AI 멤버십 2기, 스마일게이트
                    </td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>First Prize, 기초과학연구원(IBS) 양자나노과학연구단(QNS,이화여자대학교)
                    </td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>미디어아트 협회 회장상, 중앙일보
                    </td>
                </tr>
            </table>
            <br><br>
            <h3>논문</h3>
            <table>
                <tr>
                    <td>2023</td>
                    <td>안지인, 이육샛별, 장예원, 정다샘, 내재된 편향성과 차별을 완화한 한국어 인공지능 동화 생성기 구축, 디지털 콘텐츠 학회지</td>
                    <td> <a href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11485031" target='_blank' style="width:50px" > ⮂ 논문 </a></td>
                </tr>
                <tr>
                    <td>2023</td>
                    <td>안지인, 이육샛별, 장예원, 정다샘, 내재된 편향성과 차별을 완화한 한국어 인공지능 동화 생성 모델 〈프랭클린〉, HCI KOREA 논문집
                    </td>
                    <td> <a href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11229866" target='_blank' style="width:100px"> ⮂ 논문 </a></td>
                </tr>
            </table>
            <br><br>
        </div>
    `;
    };

    const setEnglishBio = () => {
        description.innerHTML = 'She aims to formalize overlooked phenomena such as love, grief, animosity, and melancholy. <br> Various media serve as the means of formalization, with each project involving a medium—such as parties, the internet, analog TV, or poem—that maximizes the formula in relation to the phenomenon. My primary interest lies in the "Data". I liberate marginalized data, images, and stories by inviting them into the digital space. Moreover, I hope that these overlooked data, gathered on the internet, will be transmitted to others through techniques such as mixing, concealing forms, anonymizing, and making noise.<br><br>';
    };

    const setEnglishCv = () => {
        description.innerHTML = `
        <div class="cv-content">
            <h3>Education</h3>
            <table>
                <tr>
                    <td>2024</td>
                    <td>Now > School for Poetic Computation(SFPC), NYC <br></td>
                    <td> <a href="https://sfpc.study/sessions/summer-24/human-scale-nlp" target='_blank' > ⮂ sfpc.study </a></td>
                </tr>
                <tr>
                    <td>2020~</td>
                    <td>BA Art&Technology, Sogang University, KR<br>
		            BS Computer Software, Sogang University, KR
                    </td>
                    <td> <a href="https://creative.sogang.ac.kr/" target='_blank' > ⮂ creative.sogang.ac.kr </a></td>
                </tr>
            </table>
            <br><br>
            <h3>Selected Group Exhibitions</h3>
            <table>
                <tr>
                    <td>2024</td>
                    <td>The Silver Bell Challenge, ten to the n, Seoul, KR</td>
                    <td> <a href="https://www.abt-avatar.world/" target='_blank'> ⮂ abt-avatar.world </a></td>
                </tr>
                <tr>
                    <td>2023</td>
                    <td>PlanT House, Hongcheon Art Museum, Hongcheon, KR
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2023</td>
                    <td>
                        ACC Unreal Engine Workshop Exhibition, ACC Media Cube, Gwangju
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2022</td>
                    <td>
                        The 8th International Exhibition on New Media Art 2022, CICA, Gimpo, KR
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>
                        Artifacts: the Creator’s View, unscene_unseen, online
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>
                        Beyond the Lens : Nano Bio Nature, SIA, Seoul, KR
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>
                    The 1st Joongang Media Art Competition, Coex Media Tower/Parnas Media Tower, Seoul, KR
                    </td>
                    <td></td>
                </tr>
            </table>
            <br><br>
            <h3>Award, Residencies & Grants</h3>
            <table>
                <tr>
                    <td>2023</td>
                    <td>Young Artists Support Platform_Hwawon: Hong Yeon-gil, Total Museum of Contemporary Art, KR</td>
                </tr>
                <tr>
                    <td>2023</td>
                    <td>Creative Awards, HCI Korea, KR
                    </td>
                </tr>
                <tr>
                    <td>2022</td>
                    <td>Smilegate AI Membership, Smilegate, KR
                    </td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>First Prize, Institute for Basic Science(IBS) Center for Quantum Nanoscience(QNS), KR
                    </td>
                </tr>
                <tr>
                    <td>2021</td>
                    <td>Media Art Association President's Award, Korea JoongAng Daily, KR
                    </td>
                </tr>
            </table>
            <br><br>
            <h3>Papers</h3>
            <table>
                <tr>
                    <td>2023</td>
                    <td>Jiin An, Saetbyeol Leeyouk, Yewon Jang, Dasaem Jeong, Construction of 
                    Debiased Korean AI Fairytale Generator, Journal of Digital Contents Society</td>
                    <td> <a href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11485031" target='_blank' > ⮂ paper </a></td>
                </tr>
                <tr>
                    <td>2023</td>
                    <td>Jiin An, Saetbyeol Leeyouk, Yewon Jang, Dasaem Jeong, Debiased korean AI 
                    fairytale generator 〈Franklin〉, PROCEEDINGS OF HCI KOREA
                    </td>
                    <td> <a href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11229866" target='_blank' > ⮂ paper </a></td>
                </tr>
            </table>
            <br><br>
        </div>
    `;
    };

    const toggleLanguage = () => {
        const isKorean = korean.textContent === 'Korean';

        if (isKorean) {
            korean.textContent = 'English';
            setKoreanBio();
            btnCv.removeEventListener('click', setEnglishCv);
            btnCv.addEventListener('click', setKoreanCv);
            btnBio.removeEventListener('click', setEnglishBio);
            btnBio.addEventListener('click', setKoreanBio);
        } else {
            korean.textContent = 'Korean';
            setEnglishBio();
            btnCv.removeEventListener('click', setKoreanCv);
            btnCv.addEventListener('click', setEnglishCv);
            btnBio.removeEventListener('click', setKoreanBio);
            btnBio.addEventListener('click', setEnglishBio);
        }
    };

    korean.addEventListener('click', toggleLanguage);

    btnBio.addEventListener('click', setEnglishBio);
    btnBio.addEventListener('click', () => {
        wikiFrame.src = "https://en.wikipedia.org/wiki/Biography";
        dynamicText.textContent = "biography";
    });
    btnCv.addEventListener('click', setEnglishCv);
    btnCv.addEventListener('click', () => {
        wikiFrame.src = "https://en.wikipedia.org/wiki/Curriculum_vitae";
        dynamicText.textContent = "curriculum vitae";
    });

    mathSelect.addEventListener('change', () => {
        const selectedValue = mathSelect.value;
        console.log(selectedValue);
        if (selectedValue === 'exponentiation') {
            wikiFrame.src = "https://en.wikipedia.org/wiki/Exponentiation";
            dynamicText.textContent = "powerful";
        } else if (selectedValue === 'complex') {
            wikiFrame.src = "https://en.wikipedia.org/wiki/Complex_number";
            dynamicText.textContent = "complex";
        } else if (selectedValue === 'irrational') {
            wikiFrame.src = "https://en.wikipedia.org/wiki/Irrational_number";
            dynamicText.textContent = "irrational";
        } else if (selectedValue === 'negative') {
            wikiFrame.src = "https://en.wikipedia.org/wiki/Negative_number";
            dynamicText.textContent = "negative";
        }
    });
});
