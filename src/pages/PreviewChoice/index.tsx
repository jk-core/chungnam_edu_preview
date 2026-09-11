import { Link } from 'react-router-dom';
import { EDU_LEVEL_LABEL, EDU_LEVELS } from '@/mocks/eduContent';
import { Logo } from '@/components/layout/Logo';
import { PATH } from '@/routes/routes';
import { cn } from '@/utils/cn';
import styles from './PreviewChoice.module.scss';

/**
 * 통합관제 상황판 시안 다섯.
 *
 * 값도 판도 다섯이 모두 같다 — 갈리는 것은 **어디에 세우는가** 와 **무슨 색으로 보이는가**
 * 뿐이라(`ControlRoom/drafts`), 설명에도 그 둘만 적는다.
 */
const CONTROL_DRAFTS = [
  { to: PATH.CONTROL, name: '시안 a', body: '판 일곱을 세 열에 나누어 세웁니다.' },
  { to: PATH.CONTROL_B, name: '시안 b', body: '열의 차례를 뒤집어 먼저 볼 것을 왼쪽에 둡니다.' },
  { to: PATH.CONTROL_C, name: '시안 c', body: '지도를 왼쪽 끝에 세우고 판 머리를 색 띠로 채웁니다.' },
  { to: PATH.CONTROL_D, name: '시안 d', body: 'AI 진단을 가운데 세우고 도면에 가까운 결로 둡니다.' },
  { to: PATH.CONTROL_E, name: '시안 e', body: '배치는 시안 a 그대로 두고 색·글꼴·질감만 갈아 끼웁니다.' },
];

/**
 * 교육용 대시보드 시안 셋.
 *
 * 설명에는 **표출 방식**만 적는다. 시안 이름(「세 개의 질문」·「데이터 콘솔」 따위)과 화면 구성은
 * 눈높이마다 달라, 그중 하나를 여기 적으면 다른 두 눈높이에서는 틀린 말이 된다. 세 눈높이를
 * 관통하는 것은 「한 번에 한 주제인가, 한 화면에 전부인가, 카드로 나누는가」 뿐이다.
 */
const EDU_DRAFTS = [
  { to: PATH.SOLAR_EDU_A, name: '시안 a', body: '한 번에 한 주제만 표출하고 일정 시간마다 자동 전환합니다.' },
  { to: PATH.SOLAR_EDU_B, name: '시안 b', body: '전체 지표를 한 화면에 배치해 전환 없이 표출합니다.' },
  { to: PATH.SOLAR_EDU_C, name: '시안 c', body: '항목을 카드 단위로 나누어 표출합니다.' },
];

/**
 * 시연용 화면 고르개 (2026-09-09 지시).
 *
 * 이 브랜치는 시연을 위해 통합관제와 교육용 대시보드만 열어 두었다. 막아 둔 주소로 들어오면
 * 모두 이 화면으로 모이므로, 시연 중에 주소를 잘못 짚어도 빈 화면이나 로그인 화면을 만나지 않는다.
 *
 * 시연이 끝나면 이 화면과 `routesList` 의 시연용 목록을 함께 걷는다.
 */
export default function PreviewChoicePage() {
  return (
    <main className={styles.choice}>
      <header className={styles.choice__head}>
        <Logo size="lg" />
        <p className={styles.choice__note}>시연에서 볼 화면을 고르세요</p>
      </header>

      <div className={styles.choice__groups}>
        {/*
          갈래 이름은 카드가 아니라 줄 머리에 적는다. 같은 줄의 카드가 모두 같은 갈래라,
          카드마다 적으면 다섯 번 되풀이되면서 정작 카드끼리 무엇이 다른지가 묻힌다.
        */}
        <section className={styles.group}>
          <h2 className={styles.group__title}>통합관제</h2>

          <ul className={styles.group__list}>
            {CONTROL_DRAFTS.map((draft) => (
              <li key={draft.to}>
                <Link className={cn(styles.card, styles['card--link'])} to={draft.to}>
                  <span className={styles.card__name}>{draft.name}</span>
                  <span className={styles.card__body}>{draft.body}</span>
                  <span className={styles.card__go} aria-hidden="true">열기 →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/*
          교육용은 카드가 통째로 링크가 아니다.

          시안(어떻게 늘어놓는가)과 눈높이(무엇을 말하는가)는 서로 다른 축이라 곱하면 아홉 가지가
          되는데, 아홉 장을 늘어놓으면 정작 견주어야 할 시안 셋이 묻힌다. 그래서 카드는 시안으로
          두고 눈높이는 그 안에서 고르게 한다 — 누르는 횟수는 어느 쪽이나 한 번으로 같다.
        */}
        <section className={styles.group}>
          <h2 className={styles.group__title}>교육용 대시보드</h2>

          <ul className={styles.group__list}>
            {EDU_DRAFTS.map((draft) => (
              <li key={draft.to}>
                <div className={styles.card}>
                  <span className={styles.card__name}>{draft.name}</span>
                  <span className={styles.card__body}>{draft.body}</span>

                  <div className={styles.card__levels}>
                    {EDU_LEVELS.map((level) => (
                      <Link
                        key={level}
                        className={styles.card__level}
                        to={`${draft.to}?level=${level}`}
                      >
                        {EDU_LEVEL_LABEL[level]}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className={styles.choice__foot}>
        교육용 대시보드의 눈높이는 본디 조회 대상의 학교급이 정합니다. 위 단추는 그 눈높이를 골라
        여는 시연용 길입니다.
        <br />
        시연용 화면이므로 위에 없는 주소로 접속하면 이 화면으로 이동합니다.
      </p>
    </main>
  );
}
