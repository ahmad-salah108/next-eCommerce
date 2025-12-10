import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbsPropsType } from "@/types/BreadcrumbsPropsType";
import { Fragment } from "react/jsx-runtime";

function Breadcrumbs({ links }: { links: Array<BreadcrumbsPropsType> }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((e, i) => (
          <Fragment key={i}>
            {links.length - 1 !== i ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={e.url} className="text-[1rem]">{e.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[1rem]">{e.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
