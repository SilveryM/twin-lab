import * as THREE from 'three'

// ---- 基础页面设置 ----
document.body.style.margin = '0'
document.body.style.overflow = 'hidden'

// ---- 三件套：Scene / Camera / Renderer ----
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x11161d) // 深蓝黑背景

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000)
camera.position.set(4, 3, 6)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

// ---- 一个方块 ----
// 注意：这里用的是 MeshBasicMaterial（不受光），所以它看起来是"扁"的。
// 这正是今晚的改造任务之一 —— 换成 MeshStandardMaterial 并加上光。
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x4f9dff })
)
scene.add(cube)

// ---- 窗口自适应 ----
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})

// ---- 渲染循环 ----
const clock = new THREE.Clock()
renderer.setAnimationLoop(() => {
  cube.rotation.y += clock.getDelta() * 0.8
  renderer.render(scene, camera)
})

/*
============================================================
今晚的 3 个改造任务（对着清单附录里的完整代码做，别直接复制）
============================================================
任务 1｜让它有色块感（10 分钟）
  - 改成 MeshStandardMaterial({ color: 0x4f9dff, metalness: 0.2, roughness: 0.4 })
  - 加 AmbientLight(0xffffff, 0.6) + DirectionalLight(0xffffff, 2.2)，方向光位置 (5,10,7)
  - 观察：方块从一个"蓝色纸片"变成一个"有明暗面的立体盒子"

任务 2｜加网格地面（5 分钟）
  - new THREE.GridHelper(20, 20, 0x2a3542, 0x1c242e)
  - 把 cube.position.y 改成 0.5，让方块"站在"地面上

任务 3｜加 OrbitControls（10 分钟）
  - import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  - 每帧调用 controls.update()
  - 鼠标左键拖拽旋转、滚轮缩放 —— 这就是清单里的验收标准

做完这 3 个任务 = Day 1 全部完成（含下午那一格）。
============================================================
*/
