import { Link, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { ADMIN_NAVIGATION, findChild } from '@/configs/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Lnb } from '@/components/layout/Lnb';
import { PageSkeleton } from '@/components/common/Skeleton';
import { PATH } from '@/routes/routes';
import { ShieldIcon } from '@/components/common/Icon';
import styles from './AdminLayout.module.scss';

/**
 * 관리자 콘솔 골격.
 * 조회 대상 패널 없이 관리자 메뉴만 좌측에 두고, 내부망 전용이라는 성격을 머리말에 밝힌다.
 */
export default function AdminLayout() {
  const { pathname } = useLocation();
  const child = findChild(ADMIN_NAVIGATION, pathname);

  return (
    <div className={styles.admin}>
      <div className={styles.admin__head}>
        <div className={styles.admin__headInner}>
          <div className={styles.admin__badgeRow}>
            <Breadcrumb
              items={child
                ? [
                  { label: ADMIN_NAVIGATION.label, path: ADMIN_NAVIGATION.children[0].path },
                  { label: child.label },
                ]
                : [{ label: ADMIN_NAVIGATION.label }]}
            />
            <span className={styles.admin__intranet}>
              <ShieldIcon width={14} height={14} />
              내부망 전용
            </span>

            {/*
              시연용 되돌아가기 (2026-09-09 지시).

              시연에서는 이 콘솔이 헤더 없이 단독으로 서므로, 이 줄을 걷으면 다른 시연 화면으로
              옮겨 갈 길이 주소창밖에 남지 않는다. 시연이 끝나면 이 링크와 `admin__preview`
              스타일을 함께 걷는다.
            */}
            <Link className={styles.admin__preview} to={PATH.PREVIEW_CHOICE}>
              시연 화면 고르기
            </Link>
          </div>

          <h1 className={styles.admin__title}>{child?.label ?? ADMIN_NAVIGATION.label}</h1>
          {child ? <p className={styles.admin__description}>{child.description}</p> : null}
        </div>
      </div>

      <div className={styles.admin__body}>
        <aside className={styles.admin__side}>
          <Lnb section={ADMIN_NAVIGATION} />
        </aside>

        <div className={styles.admin__content}>
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
