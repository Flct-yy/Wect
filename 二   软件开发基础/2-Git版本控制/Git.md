## Git初次使用
在第一次使用Git时，需要配置用户名 邮箱 编译器 尾部换行符

git级别有 系统级别(所有用户) 全局级别(当前用户所有仓库) 本地级别(当前存储库)

`git config --global user.name "We.ct"`  
`git config --global user.email 2602710174@qq.com`

将 Visual Studio Code (VS Code) 设置为 Git 的全局默认文本编辑器，并确保 Git 操作会等待编辑完成后再继续执行。  
`git config --global core.editor "code --wait"`  
打开Git全局配置文件,并用默认编辑器编辑  
`git config --global -e/--edit`

window 系统下	autocrlf=true，Linux/Mac 系统下 autocrlf=input  
这是因为 Windows 系统默认使用 CRLF 作为换行符  
而 Linux/Mac 系统默认使用 LF 作为换行符。  
`git config --global core.autocrlf true`  
`git config --global core.autocrlf input`  

## 配置diff工具
diff 工具（差异比较工具）是一个用于可视化显示文件差异的外部程序，它比命令行默认的 git diff 输出更直观，特别适合图形化对比代码或文本文件的修改内容。

+ 设置 VS Code 为默认的 diff 工具：
  ```bash
  git config --global diff.tool vscode
  ```
+ diff 工具配置
  ```bash
  git config --global difftool.vscode.cmd "D:\\Microsoft VS Code\\bin\\code --wait --diff $LOCAL $REMOTE"
  ```
+ 使用 VS Code 查看差异：
  ```bash
  git difftool
  ```
## Git常用命令
初始化仓库  
`git init`  

添加到暂存区(空格分隔多个文件)  
`git add <file>`  
移除暂存区  
`git reset <file> ` 或 ` git restore --staged <file>` 
将暂存区（stage/index）中的指定文件恢复到最近一次提交（HEAD）时的状态，但不会影响工作目录中的文件内容。

查看状态  
`git status` 或 `git status -s  # 短格式输出`  


查看提交历史  
`git log`  

提交  
`	git commit -m "消息"` 或 `git commit`(会打开默认编辑器进行多行描述)  

    第一行：简短摘要（不超过50字符）
    空一行
    第三行起：详细说明（每行不超过72字符）  

跳过暂存区直接提交  
`git commit -a -m "消息"`  

删除文件  
`git rm 文件名`  

    1. 从工作目录中删除物理文件
    2. 从暂存区中删除该文件
    3. 记录删除操作，下次提交时会包含这个删除操作

移动文件或重命名  
`git mv <old_filename> <new_filename>`  

    1. 重命名工作目录中的文件
    2. 在暂存区记录这次重命名操作
    3. 保留文件的历史记录（Git 会自动识别这是重命名而非删除+新增）

比较工作目录与暂存区  
`git diff`  
显示已暂存但未提交的变更  
`git diff --staged`  
使用diff工具
`git difftool`  

查看项目提交记录  
`git log`  
这会显示当前分支的提交历史，按时间倒序排列（最新的提交在最上面）。  

显示各种 Git 对象（如提交、标签、树和 blob）详细信息  
`git show <commit-hash>`  
如果不指定对象，默认显示 HEAD（最新提交）的详细信息。  

查看某次提交中的特定文件  
`git show <commit-hash>:<file-path>`  

用于列出 Git 树对象（目录结构）的内容，显示树对象中的文件和子目录信息。  
`git ls-tree`  
blob（文件）或 tree（目录）  

丢弃工作目录的修改，恢复到 HEAD 提交状态（不影响暂存区）  
`git restore <file>`  

从指定提交恢复文件 ( 如 --source=HEAD~1 恢复成上一次提交的版本 )   
`git restore --source=<commit> <file>`  

清理未跟踪文件  
`git clean`  

## Git分支
Git 分支（Branch）是 Git 版本控制系统的核心功能之一，它允许开发者在同一个代码库中并行开发不同的功能、修复 Bug 或进行实验，而不会影响主代码（如 main 或 master 分支）。

* 查看分支
  ```bash
  git branch          # 查看本地分支（当前分支前带 * 号）
  git branch -v       # 查看分支及其最新提交
  git branch -a       # 查看所有分支（包括远程分支）
  ```
* 创建分支
  ```bash
  git branch <分支名>       # 创建新分支（不切换）
  git checkout -b <分支名>  # 创建并切换到新分支（旧版 Git）
  git switch -c <分支名>    # 创建并切换到新分支（Git 2.23+ 推荐）
  ```
* 切换分支
  ```bash
  git checkout <分支名>     # 切换到指定分支（旧版 Git）
  git switch <分支名>       # 切换到指定分支（Git 2.23+ 推荐）
  ```
* 删除分支
  ```bash
  git branch -d <分支名>    # 删除已合并的分支（安全删除）
  git branch -D <分支名>    # 强制删除未合并的分支
  ```
* 合并分支
  ```bash
  git merge <分支名>        # 将指定分支合并到当前分支
  ```

## Git忽略文件
.gitignore文件用于指定 Git 应该忽略的文件或目录

### 语法规则
+ 忽略特定文件：
  ```text
  filename.txt
  ```

+ 忽略特定目录：
  ```text
  directory/
  ```

+ 使用通配符：
  + `*` 匹配任意字符（除了路径分隔符 /）
  + `**` 匹配任意目录层级
  + `?` 匹配单个字符
  + `[abc]` 匹配括号内的任意一个字符

+ 注释：以 # 开头
  ```text
  # 这是注释
  ```
+ 否定模式：以 ! 开头表示不忽略
  ```text
  !important.txt
  ```
### 常见忽略模式示例
```text
# 忽略所有 .log 文件
*.log

# 忽略特定文件
config.ini

# 忽略 build 目录
build/

# 忽略所有目录下的 temp 文件夹
**/temp/

# 忽略 .DS_Store 文件（Mac）
.DS_Store

# 忽略 node_modules 目录
node_modules/

# 忽略所有 .tmp 文件但不忽略 important.tmp
*.tmp
!important.tmp
```
### 多级 .gitignore 文件
+ 可以在子目录中创建额外的 .gitignore 文件
+ 子目录中的规则会覆盖父目录的规则
### 特殊情况处理
+ 已经跟踪的文件：
如果文件已经被 Git 跟踪，需要先取消跟踪：
  ```bash
  git rm --cached filename
  ```
+ 检查忽略效果：
  ```bash
  git check-ignore -v filename
  ```
### git官方标准忽略模板文档
https://github.com/github/gitignore
## Git工作流程
[`工作目录`（Working Directory）] -->|git add| [`暂存区`（Staging Area）] -->|git commit| [`本地仓库`（Repository）]

1. 工作目录（Working Directory）：你直接编辑文件的地方。
1. 暂存区（Staging Area）：通过 git add 将修改的文件暂存，准备提交。
1. 本地仓库（Repository）：通过 git commit 将暂存区的修改永久保存到 Git 历史。每次提交都直接记录文件的完整状态(不是每次的差异)

## Git本地仓库到远程仓库的同步
添加远程仓库地址  
`git remote add origin <远程仓库URL>`  
推送到远程仓库  
`git push -u origin <分支名>  # 首次推送使用-u参数`  
`git push  #后续推送可简化`  
拉取远程更改  
`git pull origin <分支名>`  
克隆远程仓库  
`git clone <远程仓库URL>`  
