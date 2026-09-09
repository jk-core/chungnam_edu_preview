import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import { PATH } from '@/routes/routes';
import styles from './PreviewChoice.module.scss';

/**
 * 시연에서 열 수 있는 화면 — 갈래마다 한 줄씩.
 *
 * 갈래 이름은 카드가 아니라 줄 머리에 적는다. 같은 줄의 카드가 모두 같은 갈래라, 카드마다
 * 적으면 다섯 번 되풀이되면서 정작 카드끼리 무엇이 다른지가 묻힌다.
 *
 * 카드 설명에는 **표출 방식**만 적는다. 통합관제 시안은 값도 판도 같고 배치와 색만 갈리며,
 * 교육 시안은 이름과 화면 구성이 눈높이마다 달라 그중 하나를 적으면 다른 두 눈높이에서는
 * 틀린 말이 된다.
 */
const GROUPS = [
  {
    kind: '통합관제',
    items: [
      { to: PATH.CONTROL, name: '시안 a', body: '판 일곱을 세 열에 나누어 세웁니다.' },
      { to: PATH.CONTROL_B, name: '시안 b', body: '열의 차례를 뒤집어 먼저 볼 것을 왼쪽에 둡니다.' },
      { to: PATH.CONTROL_C, name: '시안 c', body: '지도를 왼쪽 끝에 세우고 판 머리를 색 띠로 채웁니다.' },
      { to: PATH.CONTROL_D, name: '시안 d', body: 'AI 진단을 가운데 세우고 도면에 가까운 결로 둡니다.' },
      { to: PATH.CONTROL_E, name: '시안 e', body: '배치는 시안 a 그대로 두고 색·글꼴·질감만 갈아 끼웁니다.' },
    ],
  },
  {
    kind: '교육용 대시보드',
    items: [
      { to: PATH.SOLAR_EDU_A, name: '시안 a', body: '한 번에 한 주제만 표출하고 일정 시간마다 자동 전환합니다.' },
      { to: PATH.SOLAR_EDU_B, name: '시안 b', body: '전체 지표를 한 화면에 배치해 전환 없이 표출합니다.' },
      { to: PATH.SOLAR_EDU_C, name: '시안 c', body: '항목을 카드 단위로 나누어 표출합니다.' },
    ],
  },
  {
    kind: '관리자 콘솔',
    items: [
      {
        to: PATH.ADMIN_PLANTS,
        name: '내부망 전용',
        body: '발전소·설비와 사용자, 연계이력과 시스템 현황을 관리하는 열 갈래 화면입니다.',
      },
    ],
  },
];

/**
 * 시연용 화면 고르개 (2026-09-09 지시).
 *
 * 이 브랜치는 시연을 위해 통합관제·교육용 대시보드·관리자 콘솔만 열어 두었다. 막아 둔 주소로
 * 들어오면 모두 이 화면으로 모이므로, 시연 중에 주소를 잘못 짚어도 빈 화면이나 로그인 화면을
 * 만나지 않는다.
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
        {GROUPS.map((group) => (
          <section className={styles.group} key={group.kind}>
            <h2 className={styles.group__title}>{group.kind}</h2>

            <ul className={styles.group__list}>
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link className={styles.card} to={item.to}>
                    <span className={styles.card__name}>{item.name}</span>
                    <span className={styles.card__body}>{item.body}</span>
                    <span className={styles.card__go} aria-hidden="true">열기 →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className={styles.choice__foot}>
        교육용 대시보드는 조회 대상의 학교급에 따라 초·중·고 눈높이로 구성이 달라집니다.
        <br />
        시연용 화면이므로 위에 없는 주소로 접속하면 이 화면으로 이동합니다.
      </p>
    </main>
  );
}
