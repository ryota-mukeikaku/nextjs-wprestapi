class ScrollCancel {
    preventEvent = (e: Event) => {
        e.preventDefault()
    }

    cancel = () => {
        document.addEventListener('wheel', this.preventEvent, {
            passive: false
        })
        document.addEventListener('scroll', this.preventEvent, {
            passive: false
        })
        document.addEventListener('touchmove', this.preventEvent, {
            passive: false
        })
    }

    clear = () => {
        document.removeEventListener('wheel', this.preventEvent)
        document.removeEventListener('scroll', this.preventEvent)
        document.removeEventListener('touchmove', this.preventEvent)
    }

    set = (flg: boolean) => {
        flg ? this.clear() : this.cancel()
    }
}

export default ScrollCancel
