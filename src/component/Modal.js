import React from 'react';

function Modal({open, close, header, save, result}){
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
          </header>
          <main>
              아름다운 돌을 깎으셨네요!!!!<br/>
          {result.map((item) => (
              item
          ))}돌을 저장하시겠어용??
          </main>
          <footer>
              <div style={{textAlign: 'center'}}>
                <button className="close" onClick={save} style={{backgroundColor: 'red'}}>
                    {' '}
                    넹!!{' '}
                    </button>
                    <button className="close" onClick={close}>
                    {' '}
                    아뇽ㅠㅠ{' '}
                    </button>
            </div>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;