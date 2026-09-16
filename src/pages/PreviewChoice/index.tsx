import { Link } from 'react-router-dom';
import { EDU_LEVEL_LABEL, EDU_LEVELS } from '@/mocks/eduContent';
import { Logo } from '@/components/layout/Logo';
import { PATH } from '@/routes/routes';
import styles from './PreviewChoice.module.scss';

/**
 * 시연에서 열 수 있는 화면 (2026-09-16 지시).
 *
 * 줄 하나가 화면 갈래 하나다. 갈래 안에서 시안을 고르는 일은 **한 줄 안에서** 끝난다 —
 * 카드를 갈래마다 여러 장 늘어놓았더니 통합관제 카드와 교육용 카드가 같은 크기로 섞여,
 * 무엇이 갈래이고 무엇이 그 안의 시안인지 한 번 더 세어야 했다.
 *
 * 설명을 적지 않는다. 이 화면이 하는 일은 「어디로 갈지 고르는 것」 하나뿐이고, 시연을 여는
 * 사람은 이미 무엇이 무엇인지 알고 온다. 설명을 달면 고르는 자리가 그만큼 뒤로 밀린다.
 */
/** 교육용 대시보드 시안 셋 — 학교급이 갈려도 고를 시안은 같은 셋이다. */
const EDU_DRAFTS = [
  { label: 'A', to: PATH.SOLAR_EDU_A },
  { label: 'B', to: PATH.SOLAR_EDU_B },
  { label: 'C', to: PATH.SOLAR_EDU_C },
];

const GROUPS = [
  {
    kind: '통합관제',
    links: [
      { label: 'A', to: PATH.CONTROL },
      { label: 'B', to: PATH.CONTROL_B },
      { label: 'C', to: PATH.CONTROL_C },
    ],
  },
  /*
    교육용은 학교급마다 한 줄이다.

    시안(어떻게 늘어놓는가)과 눈높이(무엇을 말하는가)는 서로 다른 축이다. 한 줄에 시안 셋만
    두면 초등 화면을 보려고 시연 자리에서 주소를 쳐야 하는데, 아홉을 한 줄에 몰아넣으면 이번엔
    시안끼리 견주는 자리가 묻힌다. 줄을 학교급으로 갈라야 단추가 세 개씩 끊겨 보이면서 세로줄은
    통합관제와 같은 자리에 선다.

    눈높이는 본디 조회 대상의 학교급이 정한다(`resolveEduLevel`). `?level=` 은 그 판단을 손으로
    앞질러 고르는 시연용 길이라, 화면 쪽은 이 줄을 몰라도 된다.
  */
  ...EDU_LEVELS.map((level) => ({
    kind: `교육용 · ${EDU_LEVEL_LABEL[level]}`,
    links: EDU_DRAFTS.map(({ label, to }) => ({ label, to: `${to}?level=${level}` })),
  })),
];

export default function PreviewChoicePage() {
  return (
    <main className={styles.choice}>
      <header className={styles.choice__head}>
        <Logo size="lg" />
      </header>

      <ul className={styles.list}>
        {GROUPS.map((group) => (
          <li key={group.kind} className={styles.row}>
            <span className={styles.row__kind}>{group.kind}</span>

            <span className={styles.row__links}>
              {group.links.map((link) => (
                <Link key={link.to} className={styles.go} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
