# 인공지능(영상) 스켈레톤 프로젝트

<!-- 필수 항목 -->

## 소개

인공지능(영상) 프로젝트의 스켈레톤 코드

<!-- 필수 항목 -->

## 기술스택 및 라이브러리

| Project | Version | Description |
| ------- | ------- | ----------- |
| Python  | 3.7.x  |             |
| Numpy | 1.18.1 | Build Tool  |
| Scipy | 1.4.1 |             |
| Scikit-learn | 0.22.1 |             |
| Tensorflow | 2.0.0 | |
| Matplotlib | 3.1.3 | |

<!-- 필수 항목 -->

## 개발 환경 구성

Windows 기준 개발 환경 구성 설명

1. Anaconda 설치
   1. 웹 사이트 접속 후 Windows용 Anaconda 다운로드 및 설치
      - download link: https://www.anaconda.com/distribution/	
      - Anaconda Prompt 실행 후 가상 환경 생성 및 활성화
      
        ```
        conda create -n AI python=3.7
        conda activate AI
        ```
      
   2. Tensorflow 및 필요 라이브러리 설치

      ```
      conda install git matplotlib scikit-learn tqdm scipy numpy tensorflow-gpu==2.0.0
      ```

      

   3. 스켈레톤 프로젝트 구성

      * 스켈레톤 다운로드

      ```
      git clone <Skeleton REPO URL>
      ```

      * 이미지 데이터 다운로드 후 스켈레톤 프로젝트의 datasets/images 폴더 안에 압축 해제
        * download link: [http://ssafylab.ssafy.io/6th-files/images.zip](http://ssafylab.ssafy.io/6th-files/images.zip)
      
   4. 스켈레톤 프로젝트 예제 실행

      ```
      python linear_regression.py
      ```

      





## 디렉토리 구조

```
.
├─checkpoints  # 학습된 모델들이 저장되는 폴더
├─data  # 데이터 처리 함수들이 위치한 폴더
├─datasets  # 실제 데이터가 위치한 경로
├─models  # 이미지 캡셔닝 모델이 위치한 경로
├─utils  # 데이터 시각화, 학습 및 테스트에 필요한 유틸리티 함수들이 위치한 경로
| config.py  # 설정 변수들이 저장된 파일
| linear_regression.py  # 선형 회귀 모델의 학습 및 시각화 예시 코드
| predict.py  # 학습된 모델 기반 새로운 데이터에 대한 결괏값 예측
| train.py # 모델 학습 파일

```

