import {test,expect} from "@playwright/test";

test("hero and real profile links render",async({page})=>{
  await page.goto("/");
  await expect(page.getByRole("heading",{level:1})).toContainText("I build software");
  await expect(page.getByRole("link",{name:/See my projects/})).toBeVisible();
  await expect(page.getByRole("link",{name:/GitHub profile/})).toHaveAttribute("href","https://github.com/Toufiqul-27");
  await expect(page.locator(".portrait-surface img")).toHaveJSProperty("complete",true);
  expect(await page.locator(".portrait-surface img").evaluate(img=>img.naturalWidth)).toBeGreaterThan(0);
});

test("project filter narrows cards and restores all",async({page})=>{
  await page.goto("/");
  await expect(page.locator(".project-card:visible")).toHaveCount(4);
  await page.getByRole("button",{name:"Backend",exact:true}).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(2);
  await expect(page.getByText("Showing 2 projects")).toBeVisible();
  await page.getByRole("button",{name:"Frontend",exact:true}).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(1);
  await expect(page.getByText("Showing 1 project")).toBeVisible();
  await page.getByRole("button",{name:"All work"}).click();
  await expect(page.locator(".project-card:visible")).toHaveCount(4);
});

test("native project brief is expandable",async({page})=>{
  await page.goto("/");
  const details=page.locator(".project-details").first();
  await expect(details).not.toHaveAttribute("open");
  await details.locator("summary").click();
  await expect(details).toHaveAttribute("open","");
  await expect(details.locator(".detail-body")).toContainText("Problem:");
});

test("theme toggle works and persists across reloads",async({page})=>{
  await page.goto("/");
  const current=await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button",{name:/Switch to (dark|light) theme/}).click();
  const changed=await page.locator("html").getAttribute("data-theme");
  expect(changed).not.toBe(current);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme",changed);
});

test("layout does not horizontally overflow and navigation is accessible",async({page,isMobile})=>{
  await page.goto("/");
  if(isMobile){
    const toggle=page.locator("#menuToggle");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded","true");
    await page.getByRole("navigation",{name:"Primary navigation"}).getByRole("link",{name:"Open source"}).click();
    await expect(toggle).toHaveAttribute("aria-expanded","false");
    await expect(page).toHaveURL(/#contributions$/);
  }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
  expect(overflow).toBe(false);
});
